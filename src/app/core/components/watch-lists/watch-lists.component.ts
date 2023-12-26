import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WatchListService } from '../../services/watchList.service';
import { WatchList } from '../../models/watchList';
import { WatchListEntry } from '../../models/watchListEntry';
import { StocksService } from '../../services/stocks.service';
import { Quote } from '../../models/quote';
import { map, mergeMap, of, tap } from 'rxjs';
import { SubSink } from '../../util/subSink';
import { AppUtil } from '../../util/app-util';

@Component({
	selector: 'app-watch-lists',
	templateUrl: './watch-lists.component.html',
	styleUrls: ['./watch-lists.component.css']
})
export class WatchListsComponent implements OnInit {

	@ViewChild('selectorWatchList')
	public watchListSelector: ElementRef | undefined;

	public allWatchLists: WatchList[] = [];
	public selectedSymbols: WatchListEntry[] | undefined;
	private selectedWatchListId: string = '';
	public symbolQuotes: Quote[] = [];
	private sub = new SubSink();

    constructor(private watchListService: WatchListService,
				private stocksService: StocksService
	) { }

	ngOnInit(): void {
		this.sub.sink = this.watchListService.fetchAllWatchLists().subscribe(watchLists => {
			if (watchLists) {
				this.allWatchLists = watchLists.slice();
				if (this.allWatchLists.length > 0) {
					this.selectedWatchListId = this.allWatchLists[0].id;
					this.fetchSymbolsForSelectedListId();
				}
			}
		});
	}

	public changeSelectorOption() : void {
		const value = this.watchListSelector?.nativeElement.value;
		const selectedList = this.allWatchLists?.find(w => w.name === value);
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
		this.fetchSymbolsForSelectedListId();
	}

	public getChangeDisplay(change: number): string {
		const value = AppUtil.round(change, 2);
		return value > 0.0 ? '+' + value + '%' : value.toString() + '%';
	}

	public getPriceDisplay(price: number): string {
		const value = AppUtil.round(price, 2);
		return `$${value}`;
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
			.pipe(tap((quotes: Quote[]) => {
				this.symbolQuotes = quotes.slice();
			}))
			.subscribe();
	}
}
