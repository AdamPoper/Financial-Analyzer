import { Injectable } from "@angular/core";
import { STOCK_QUOTE_TEST_DATA } from "../test-data/stock-quote-test-data";
import { HISTORICAL_STOCK_PRICE } from "../test-data/historical-price-test-data";
import { Quote } from "../models/quote";
import { map, of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Interval } from "../models/interval";
import { DIVIDEND_TEST_DATA } from "../test-data/aapl-dividend-test-data";
import { Dividend } from "../models/dividend";
import { Historical } from "../models/historical";

@Injectable({providedIn: 'root'})
export class StocksService {
    
    constructor(private http: HttpClient) {

    }

    public fetchQuoteByTicker(ticker: string): Observable<Quote | undefined> {
        return of(STOCK_QUOTE_TEST_DATA)
            .pipe(map((data: Quote[]) => {
                if (data !== undefined && data !== null && data.length !== 0) {
                    return new Quote(data[0]);
                }
                return undefined;
            }));
    }

    public fetchTickerHistoricalPrices(start: Date, end: Date, ticker: string): Observable<Interval[]> {
        return of(HISTORICAL_STOCK_PRICE)
            .pipe(map((data: Historical<Interval>) => {
               return this.mapHistorical<Interval>(data, ticker);
            }));
    }

    public fetchDividendDatabyTicker(ticker: string) {
        return of(DIVIDEND_TEST_DATA)
            .pipe(map((data: Historical<Dividend>) => {
                return this.mapHistorical<Dividend>(data, ticker);
            }));
    }

    private mapHistorical<T>(data: Historical<T>, ticker: string): Array<T> {
        if (data.symbol === ticker) {
            const dataSet = [...data.historical];
            if (dataSet !== undefined && dataSet !== null && dataSet.length !== 0) {
                return dataSet;
            }
        }
        return new Array<T>();
    }
}