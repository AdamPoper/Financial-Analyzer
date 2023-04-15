import { Injectable } from "@angular/core";
import { Quote } from "../models/quote";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Interval } from "../models/interval";
import { Dividend } from "../models/dividend";
import { Historical } from "../models/historical";
import { AppUtil } from "../util/app-util";

@Injectable({providedIn: 'root'})
export class StocksService {
    
    constructor(private http: HttpClient) {

    }

    public fetchQuoteByTicker(ticker: string): Observable<Quote | undefined> {
        ticker = ticker.toUpperCase();
        if (!ticker || ticker === '') {
            throw new Error('Ticker is empty');
        }
        return this.http.get<Quote[]>(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=6bdfa0e424ca10e8d42f1a07bc67669d`)
            .pipe(map((data: Quote[]) => {
                if (data !== undefined && data !== null && data.length !== 0) {
                    return new Quote(data[0]);
                }
                return undefined;
            }));
    }

    public fetchTickerHistoricalPrices(start: Date, end: Date, ticker: string): Observable<Interval[]> {
        ticker = ticker.toUpperCase();
        if (!ticker || ticker === '') {
            throw new Error('Ticker is empty');
        }
        const from = AppUtil.getFormattedDate(start);
        const to = AppUtil.getFormattedDate(end);
        return this.http.get<Historical<Interval>>(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=${from}&to=${to}&apikey=6bdfa0e424ca10e8d42f1a07bc67669d`)
            .pipe(map((data: Historical<Interval>) => {
               return this.mapHistorical<Interval>(data, ticker);
            }));
    }

    public fetchDividendDataByTicker(ticker: string) {
        ticker = ticker.toUpperCase();
        return this.http.get<Historical<Dividend>>(`https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${ticker}?apikey=6bdfa0e424ca10e8d42f1a07bc67669d`)
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