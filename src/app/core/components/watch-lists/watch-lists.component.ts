import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WatchListService } from '../../services/watchList.service';
import { WatchList } from '../../models/watchList';
import { WatchListEntry } from '../../models/watchListEntry';
import { StocksService } from '../../services/stocks.service';
import { Quote } from '../../models/quote';
import { Observable, combineLatest, map, mergeMap, of, tap } from 'rxjs';
import { SubSink } from '../../util/subSink';
import { AppUtil } from '../../util/app-util';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Interval } from '../../models/interval';

type IntervalSymbol = {
	symbol: string,
	data: Interval[];
}

@Component({
	selector: 'app-watch-lists',
	templateUrl: './watch-lists.component.html',
	styleUrls: ['./watch-lists.component.css']
})
export class WatchListsComponent implements OnInit {

	@ViewChild('selectorWatchList')
	public watchListSelector: ElementRef | undefined;

	public allWatchLists: WatchList[] = [];
	public selectedSymbols: WatchListEntry[] = [];
	public symbolQuotes: Quote[] = [];
	public isAddSymbolModalOpen = false;
	public isAddNewWatchListModalOpen = false;
	public searchQuote: Quote | undefined;
	public selectedListName: string | undefined;
	public isEditing: boolean = false;
	public chartConfigOptions: ChartConfiguration['options'] | undefined;
	public chartConfigData: ChartConfiguration['data'] | undefined;

	private sub = new SubSink();
	private selectedWatchListId: string = '';
	private searchSymbol: string | undefined;
	private newListName: string | undefined;

    constructor(private watchListService: WatchListService,
				private stocksService: StocksService,
				private router: Router
	) { }

	ngOnInit(): void {
		this.sub.sink = this.watchListService.fetchAllWatchLists().subscribe(watchLists => {
			if (watchLists) {
				this.allWatchLists = watchLists.slice();
				if (this.allWatchLists.length > 0) {
					this.selectedWatchListId = this.allWatchLists[0].id;
					this.selectedListName = this.allWatchLists[0].name;
					this.fetchSymbolsForSelectedListId();
				}
			}
		});

		this.chartConfigOptions = {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
	}

	public changeSelectorOption() : void {
		const selectedList = this.allWatchLists?.find(w => w.name === this.selectedListName);
		if (selectedList) {
			this.selectedWatchListId = selectedList.id;
			this.fetchSymbolsForSelectedListId();
		}
	}

	public deleteWatchList(): void {
		this.watchListService.deleteWatchList(this.selectedWatchListId).subscribe();
		const i = this.allWatchLists.findIndex(w => w.id === this.selectedWatchListId);
		if (i !== -1) {
			this.allWatchLists.splice(i, 1);
		}
		this.selectedWatchListId = this.allWatchLists[0].id;
		this.selectedListName = this.allWatchLists[0].name;
		this.fetchSymbolsForSelectedListId();
	}

	public getChangeDisplay(change: number): string {
		const value = AppUtil.round(change, 2);
		return value > 0.0 ? '+' + value.toFixed(2) + '%' : value.toFixed(2) + '%';
	}

	public getPriceDisplay(price: number): string {
		const value = AppUtil.round(price, 2);
		return `$${value.toFixed(2)}`;
	}

	public openAddSymbolModal(): void {
		this.isAddSymbolModalOpen = true;
	}

	public openAddNewWatchListModal(): void {
		this.isAddNewWatchListModalOpen = true;
	}

	public closeAddSymbolModal(): void {
		this.isAddSymbolModalOpen = false;
		this.searchSymbol = undefined;
	}

	public closeAddWatchListModal(): void {
		this.isAddNewWatchListModalOpen = false;
		this.newListName = undefined;
	}

	public onAddSymbolInputChange(event: Event): void {
		this.searchSymbol = (event.target as HTMLInputElement).value;
	}

	public onAddNewListInputChange(event: Event): void {
		this.newListName = (event.target as HTMLInputElement).value;
	}

	public searchForQuote(): void {
		if (this.searchSymbol) {
			this.sub.sink = this.stocksService.fetchQuoteByTicker(this.searchSymbol)
				.subscribe((quote) => {
					this.searchQuote = quote;
				});
		}
	}

	public addSymbolToSelectedWatchList(): void {
		if (this.searchQuote) {
			this.symbolQuotes.push(this.searchQuote);
			this.sub.sink = this.watchListService.addSymbolToWatchList(this.selectedWatchListId, this.searchQuote.symbol)
				.pipe(mergeMap(() => this.generateChartData()))
				.subscribe();
		}
	}

	public createNewWatchList(): void {
		if (this.newListName) {
			this.sub.sink = this.watchListService.createNewWatchList(this.newListName)
				.pipe(mergeMap(() => this.watchListService.fetchAllWatchLists()))
				.pipe(tap((watchLists: WatchList[]) => {
					this.allWatchLists = watchLists.slice();
					const newList = this.allWatchLists.find(w => w.name === this.newListName);
					
					if (newList) {
						this.selectedWatchListId = newList.id;
					}

					if (this.watchListSelector) {
						this.selectedListName = this.newListName;
					}
					
					this.fetchSymbolsForSelectedListId();
					this.closeAddWatchListModal();
				}))
				.subscribe(() => this.chartConfigData = undefined);
		}
	}

	public existsInWatchList(symbol: string): boolean {
		return !!this.symbolQuotes.find(q => q.symbol === symbol);
	}

	public isSelected(name: string): boolean {
		return this.newListName === name;
	}

	public deleteFromList(symbol: string): void {
		symbol = symbol.toLowerCase();
		const selectedSymbol = this.selectedSymbols.find(s => s.symbol === symbol);
		if (selectedSymbol) {
			this.sub.sink = this.watchListService.removeSymbolFromWatchList(
				selectedSymbol.id
			)
			.pipe(mergeMap(() => {
				const quote = this.symbolQuotes.find(q => q.symbol.toLowerCase() === symbol);
				if (quote) {
					AppUtil.removeFromArray<Quote>(this.symbolQuotes, quote);
				}
				AppUtil.removeFromArray<WatchListEntry>(this.selectedSymbols, selectedSymbol);
				return this.generateChartData();
			}))
			.subscribe();
		}
	}

	public toggleEditing(): void {
		this.isEditing = !this.isEditing;
	}

	public navigateToSymbolQuote(symbol: string): void {
		this.router.navigateByUrl(`/stocks/${symbol}`);
	}

	private fetchSymbolsForSelectedListId(): void {
		this.sub.sink = this.watchListService.fetchAllEntriesByWatchListId(this.selectedWatchListId)
			.pipe(map((watchListSymbols: WatchListEntry[]) => {
				this.selectedSymbols = watchListSymbols.slice();
				return this.selectedSymbols.map(listEntry => listEntry.symbol);
			}))
			.pipe(mergeMap((symbols: string[]) => {
				if (symbols.length !== 0) {
					return this.stocksService.fetchQuotesForMultipleSymbols(symbols);
				}
				return of([]);
			}))
			.pipe(mergeMap((quotes: Quote[]) => {
				this.symbolQuotes = quotes.slice();
				if (this.symbolQuotes.length !== 0) {
					return this.generateChartData();
				}
				this.chartConfigData = undefined;
				return of();
			}))
			.subscribe();
	}

	private generateChartData(): Observable<any> {
		const fetchSymbols = this.symbolQuotes.map(sym => this.getHistoricalPriceInfo(sym.symbol));
		const chartLabels = new Array<string>();
		const chartData = new Array<number>();
		return combineLatest(fetchSymbols)
			.pipe(tap((intervalData: IntervalSymbol[]) => {
				const period = 200;
				for (const intervalSymbol of intervalData) {
					const symbol = intervalSymbol.symbol;
					const interval = intervalSymbol.data;
					const countDoomed = interval.length - period;
					interval.splice(period, countDoomed);
					const sma200 = interval.map(i => i.close)
						.reduce((prev, current) => prev + current) / period;
					const currentPrice = this.symbolQuotes.find(sq => sq.symbol === symbol)?.price || 0
					const sma200Divergence = ((1 - (sma200 / currentPrice)) * 100);
					chartData.push(sma200Divergence);
					chartLabels.push(symbol);
				}
				this.chartConfigData = AppUtil.createDefaultAppChartDataConfig(
					chartData,
					chartLabels
				);
			}));
	}

	private getHistoricalPriceInfo(symbol: string): Observable<IntervalSymbol> {
		symbol = symbol.toUpperCase();
		const end = new Date();
		const start = AppUtil.daysAgoFromToday(365, end);
		return this.stocksService.fetchTickerHistoricalPrices(start, end, symbol)
			.pipe(map((intervals: Interval[]) => {
				return {
					symbol: symbol,
					data: intervals
				} as IntervalSymbol;
			}))
	}
}
