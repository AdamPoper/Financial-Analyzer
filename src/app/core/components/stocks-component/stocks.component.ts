import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { Interval } from '../../models/interval';
import { Quote } from '../../models/quote';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { combineLatest, tap } from 'rxjs';
import { AppUtil } from '../../util/app-util';
import { Dividend } from '../../models/dividend';

interface CanvasInterval {
  date: string;
  price: number;
}

const ChartTimePeriods = {
  OneDay: '1D',
  OneWeek: '1W',
  OneMonth: '1M',
  ThreeMonths: '3M',
  SixMonths: '6M',
  OneYear: '1Y',
  TwoYears: '2Y',
  ThreeYears: '3Y',
  FiveYears: '5Y',
  TenYears: '10Y'
};

@Component({
  selector: 'app-stocks-component',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  
  public ticker: string = '';
  public priceHistories = new Map<string, Array<Interval>>();
  public dividendHistory: Array<Dividend> = [];
  public quote: Quote | undefined;
  public chartConfigData: ChartConfiguration['data'] | undefined;
  public chartConfigOptions: ChartConfiguration['options'] | undefined;
  public selectedTimePeriodOption: string = ChartTimePeriods.OneYear;

  constructor(private stocksService: StocksService) {

  }

  ngOnInit(): void {
    
  }

  public onTickerSearch(): void {
    this.selectedTimePeriodOption = ChartTimePeriods.OneYear;
    if (this.ticker !== null && this.ticker !== '') {
      const start = AppUtil.yearsAgoFromToday(1);
      const today = new Date();
      combineLatest([
        this.stocksService.fetchQuoteByTicker(this.ticker),
        this.stocksService.fetchTickerHistoricalPrices(start, today, this.ticker),
        this.stocksService.fetchDividendDataByTicker(this.ticker)
      ]).pipe(tap(([quote, intervals, dividends]) => {
          intervals.reverse();
          this.priceHistories.set(this.selectedTimePeriodOption, intervals);
          this.quote = quote;
          this.dividendHistory = [...dividends];
      })).subscribe(() => {
        this.prepareInitChartConfig();
      });
    }
  }

  public onTimePeriodChange(timePeriod: string) {
    this.selectedTimePeriodOption = timePeriod;
    this.prepareInitChartConfig();
  }

  public round(n: number): number {
    return AppUtil.round(n, 2);
  }

  public dateFormat(date: string): string {
    return AppUtil.getFormattedDate(new Date(date));
  }

  public get shouldDisplayQuoteInfo(): boolean {
    return this.quote !== undefined;
  }

  public get priceHistoryOptions(): string[] {
    return Object.values(ChartTimePeriods);
  }

  public get tickerPaysDividend(): boolean {
    return this.dividendHistory.length !== 0;
  }

  public get latestDividendQuote(): number {
    if (!this.tickerPaysDividend) {
      return 0;
    }

    const latestDividend = this.dividendHistory[0];
    if (latestDividend.dividend === null) {
      return 0;
    }

    const latestDivDate = AppUtil.getDateFromFormat(latestDividend.date);
    const oneYearAgo = AppUtil.yearsAgoFromSpecifiedDate(1, latestDivDate);
    let distributionSchedule = 0;
    // TODO fix incorrect dividend rate bug
    for (const div of this.dividendHistory) {
      const divDate = AppUtil.getDateFromFormat(div.date);
      if (divDate.getTime() < oneYearAgo.getTime()) {
        const price = this.quote?.price;
        if (price !== undefined) {
          console.log(distributionSchedule);
          return AppUtil.round(latestDividend.dividend * distributionSchedule / price * 100, 2);
        }
        return 0;
      }
      distributionSchedule++;
    }
    throw new Error("Eternal Dividend Data");
  }

  private getStartDateForSelectedOption() {
    const today = new Date();
    switch (this.selectedTimePeriodOption) {
      // TODO: need to add a way to get more time intervals for 1D, 1W, 1M
      case ChartTimePeriods.OneDay: today.setDate(today.getDate() - 1); return today;
      case ChartTimePeriods.OneWeek: return AppUtil.weeksAgoFromToday(1);
      case ChartTimePeriods.OneMonth: return AppUtil.monthsAgoFromToday(1);
      case ChartTimePeriods.ThreeMonths: return AppUtil.monthsAgoFromToday(3);
      case ChartTimePeriods.SixMonths: return AppUtil.monthsAgoFromToday(6);
      case ChartTimePeriods.OneYear: return AppUtil.yearsAgoFromToday(1);
      case ChartTimePeriods.TwoYears: return AppUtil.yearsAgoFromToday(2);
      case ChartTimePeriods.ThreeYears: return AppUtil.yearsAgoFromToday(3);
      case ChartTimePeriods.FiveYears: return AppUtil.yearsAgoFromToday(5);
      case ChartTimePeriods.TenYears: return AppUtil.yearsAgoFromToday(10);
      default: throw new Error('Invalid Time Period Option' + this.selectedTimePeriodOption);
    }
  }

  private prepareInitChartConfig(): void {
    const start = this.getStartDateForSelectedOption();
    const end = new Date();

    if (this.priceHistories.has(this.selectedTimePeriodOption)) {
      const dataSet = this.getPriceHistory(start, end);
      this.initChartConfig(dataSet);
    } else {
      this.stocksService.fetchTickerHistoricalPrices(start, end, this.ticker)
        .subscribe((intervals: Array<Interval>) => {
          intervals.reverse();
          this.priceHistories.set(this.selectedTimePeriodOption, intervals);
          const dataSet = this.getPriceHistory(start, end);
          this.initChartConfig(dataSet);
        });
    } 
  }

  private initChartConfig(dataSet: Array<CanvasInterval>): void {
    this.chartConfigData = {
      datasets: [{
        data: dataSet.map(i => i.price),
        fill: false,
        borderColor: '#3485d1',
        tension: 0,
        label: undefined,
        pointRadius: 0
      }],
      labels: dataSet.map(i => i.date)
    };
    this.chartConfigOptions = {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }

  private getPriceHistory(start: Date, end: Date): CanvasInterval[] {
    const dataSet = new Array<CanvasInterval>();

    if (start.getTime() > end.getTime()) {
      return dataSet;
    }

    const priceHistory = this.priceHistories.get(this.selectedTimePeriodOption);

    let spread: number;
    switch(this.selectedTimePeriodOption) {
      case ChartTimePeriods.OneDay: spread = 0; break;
      case ChartTimePeriods.OneWeek: spread = 1; break;
      case ChartTimePeriods.OneMonth: spread = 1; break;
      case ChartTimePeriods.ThreeMonths: spread = 1; break;
      case ChartTimePeriods.SixMonths: spread = 1; break;
      case ChartTimePeriods.OneYear: spread = 1; break;
      case ChartTimePeriods.TwoYears: spread = 2; break;
      case ChartTimePeriods.ThreeYears: spread = 3; break;
      case ChartTimePeriods.FiveYears: spread = 7; break;
      case ChartTimePeriods.TenYears: spread = 7; break;
      default: throw new Error("Invalid selected time period");
    }

    if (priceHistory !== undefined && priceHistory.length !== 0) {
      for (let i = 0; i < priceHistory.length; i += spread) {
        const interval = priceHistory[i];
        const intervalDate = AppUtil.getDateFromFormat(interval.date);

        if (intervalDate >= start) {
          dataSet.push({date: interval.date, price: interval.close});
        }

        if (AppUtil.getDateFromFormat(interval.date) > end) {
          return dataSet;
        }
      }
    }
    return dataSet;
  }
}
