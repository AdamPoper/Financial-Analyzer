import { Injectable } from "@angular/core";
import { Quote } from "../models/quote";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Interval } from "../models/interval";
import { Dividend } from "../models/dividend";
import { Historical } from "../models/historical";
import { AppUtil } from "../util/app-util";
import { GeneralFinancialStatement } from "../models/financial-statement";
import { API_KEY } from "src/app/apiKey";
import { ShareCount } from "../models/shareCount";

@Injectable({providedIn: 'root'})
export class StocksService {
    
    constructor(private http: HttpClient) {

    }

    public fetchQuoteByTicker(ticker: string): Observable<Quote | undefined> {
        ticker = ticker.toUpperCase();
        if (!ticker || ticker === '') {
            throw new Error('Ticker is empty');
        }
        return this.http.get<Quote[]>(`https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`)
            .pipe(map((data: Quote[]) => {
                if (data !== undefined && data !== null && data.length !== 0) {
                    return new Quote(data[0]);
                }
                return undefined;
            }));
    }

    public fetchQuotesForMultipleSymbols(symbols: string[]): Observable<Quote[]> {
        symbols = symbols.map(s => s.toUpperCase());
        if (symbols.length === 0) {
            throw new Error('Symbols is empty');
        }
        const symbolsPathParam = symbols.join(',');
        return this.http.get<Quote[]>(`https://financialmodelingprep.com/api/v3/quote/${symbolsPathParam}?apikey=${API_KEY}`)
            .pipe(map((data: Quote[]) => {
                return data.map(q => new Quote(q));
            }));
    } 

    public fetchTickerHistoricalPrices(start: Date, end: Date, ticker: string): Observable<Interval[]> {
        ticker = ticker.toUpperCase();
        if (!ticker || ticker === '') {
            throw new Error('Ticker is empty');
        }
        const from = AppUtil.getFormattedDate(start);
        const to = AppUtil.getFormattedDate(end);
        return this.http.get<Historical<Interval>>(`https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=${from}&to=${to}&apikey=${API_KEY}`)
            .pipe(map((data: Historical<Interval>) => {
               return this.mapHistorical<Interval>(data, ticker);
            }));
    }

    public fetchDividendDataByTicker(ticker: string) {
        ticker = ticker.toUpperCase();
        return this.http.get<Historical<Dividend>>(`https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${ticker}?apikey=${API_KEY}`)
            .pipe(map((data: Historical<Dividend>) => {
                return this.mapHistorical<Dividend>(data, ticker);
            }));
    }

    public fetchHistoricalSharesOutstanding(symbol: string): Observable<Array<ShareCount>> {
        symbol = symbol.toUpperCase();
        return this.http.get<Array<ShareCount>>(
            `https://financialmodelingprep.com/api/v4/historical/shares_float?symbol=${symbol}&apikey=${API_KEY}`
        );
    }

    public fetchCashFlowStatements(
        ticker: string,
        period: string,
        count: number
    ): Observable<Array<GeneralFinancialStatement>> {
        ticker = ticker.toUpperCase();
        return this.fetchGeneralizedFinancialStatement(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${ticker}?period=${period}&limit=${count}&apikey=${API_KEY}`
        );
    }

    public fetchIncomeStatements(
        ticker: string, 
        period: string, 
        count: number
    ): Observable<Array<GeneralFinancialStatement>> {
        ticker = ticker.toUpperCase();
        return this.fetchGeneralizedFinancialStatement(
            `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?limit=${count}&period=${period}&apikey=${API_KEY}`
        );
    }

    public fetchBalanceSheetStatements(
        ticker: string,
        period: string,
        count: number
    ): Observable<Array<GeneralFinancialStatement>> {
        return this.fetchGeneralizedFinancialStatement(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${ticker}?period=${period}&limit=${count}&apikey=${API_KEY}`
        );
    }

    private fetchGeneralizedFinancialStatement(url: string) {
        return this.http.get<Array<GeneralFinancialStatement>>(url)
            .pipe(map((data: Array<GeneralFinancialStatement>) => {
                if (data && data.length !== 0) {
                    return data;
                }
                return new Array<GeneralFinancialStatement>();
            }));
    }

    private mapHistorical<T>(data: Historical<T>, ticker: string): Array<T> {
        if (data.symbol === ticker) {
            const dataSet = [...data.historical];
            if (dataSet && dataSet.length !== 0) {
                return dataSet;
            }
        }
        return new Array<T>();
    }
}