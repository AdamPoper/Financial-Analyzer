import { Injectable } from "@angular/core";
import { STOCK_QUOTE_TEST_DATA } from "../test-data/stock-quote-test-data";
import { HISTORICAL_STOCK_PRICE } from "../test-data/historical-price-test-data";
import { Quote } from "../models/quote";
import { map, of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Interval } from "../models/interval";

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
            .pipe(map((data) => {
                const intervals = new Array<Interval>();
                if (data["symbol"] === ticker) {
                    const dataSet = data["historical"];
                    if (dataSet !== undefined && dataSet !== null && dataSet.length !== 0) {
                        return dataSet.map(i => new Interval(i))
                    }
                }
                return intervals;
            }));
    }
}