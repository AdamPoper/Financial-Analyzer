import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { Interval } from '../../models/interval';
import { Quote } from '../../models/quote';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { combineLatest, tap } from 'rxjs';
import { AppUtil } from '../../util/app-util';
import { Dividend } from '../../models/dividend';
import { GeneralFinancialStatement } from '../../models/financial-statement';

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

const ReportingPeriod = {
    Annual: 'annual',
    Quarterly: 'quarterly'
};

const cashFlowTermsOfInterest = {
    freeCashFlow: 'Free Cash Flow',
    depreciationAndAmortization: 'Depreciation and Amortization',
    stockBasedCompensation: 'Stock Based Compensation',
    commonStockRepurchased: 'Common Stock Repurchased',
    cashAtEndOfPeriod: 'Cash at End of Period',
    operatingCashFlow: 'Operating Cash Flow',
    capitalExpenditure: 'Capital Expenditure',
};

const incomeTermsOfInterest = {
    revenue: 'Revenue',
    costOfRevenue: 'Cost of Revenue',
    grossProfit: 'Gross Profit',
    researchAndDevelopmentExpenses: 'R&D Expenses',
    generalAndAdministrativeExpenses: 'General/Admin Expenses',
    otherExpenses: 'Other Expenses',
    operatingExpenses: 'Operating Expenses',
    costAndExpenses: 'Cost and Expenses',
    interestIncome: 'Interest Income',
    interestExpense: 'Interest Expense',
    ebita: 'EBITA',
    operatingIncome: 'Operating Income',
    incomeBeforeTax: 'Income Before tax',
    incomeTaxIncome: 'Income Tax Expense',
    netIncome: 'Net Income',
    eps: 'Earnings per Share'
};

const balanceSheetTermsOfInterest = {
    cashAndCashEquivalents: 'Cash and Cash Equivalents',
    shortTermInvestments: 'Short Term Investments',
    cashAndShortTermInvestments: 'Cash and Short Term Investments',
    otherCurrentAssets: 'Other Current Assets',
    totalCurrentAssets: 'Total Current Assets',
    propertyPlantEquipmentNet: 'Property Plant Equipment Net',
    longTermInvestments: 'Long Term Investments',
    totalAssets: 'Total Assets',
    shortTermDebt: 'Short Term Debt',
    totalLiabilities: 'Total Liabilities',
    totalStockHolderEquity: 'Total Stock Holder Equity',
    totalInvestments: 'Total Investments',
    totalDebt: 'Total Debt',
    netDebt: 'Net Debt',
};

@Component({
    selector: 'app-stocks-component',
    templateUrl: './stocks.component.html',
    styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  
    public ticker: string;
    public priceHistories: Map<string, Array<Interval>>;
    public dividendHistory: Array<Dividend>;
    public quote: Quote | undefined;
    public selectedTimePeriodOption: string = ChartTimePeriods.OneYear;
    public selectedReportingPeriod: string = ReportingPeriod.Annual;
    public selectedReportingPeriodForPopUp: string = ReportingPeriod.Annual;
    public chartDataConfigForPopUp: ChartConfiguration['data'] | undefined;
    public chartConfigData: ChartConfiguration['data'] | undefined;
    public chartConfigOptions: ChartConfiguration['options'] | undefined;
    public cashFlowStatements: Array<GeneralFinancialStatement>;
    public cashFlowChartDataConfigs: Map<string, ChartConfiguration['data']>;
    public incomeStatements: Array<GeneralFinancialStatement>;
    public incomeChartDataConfigs: Map<string, ChartConfiguration['data']>;
    public balanceSheetStatements: Array<GeneralFinancialStatement>;
    public balanceSheetChartConfigs: Map<string, ChartConfiguration['data']>;
    public quarterlyStatementConfigs: Map<string, ChartConfiguration['data']>;
    public shouldOpenChartModal: boolean;
    private activeSelectedKey: string;
    private reportingPeriods: Map<string, string>;

    constructor(private stocksService: StocksService) {
        this.ticker = '';
        this.activeSelectedKey = '';
        this.shouldOpenChartModal = false;
        this.priceHistories = new Map<string, Array<Interval>>();
        this.dividendHistory = new Array<Dividend>();
        this.cashFlowStatements = new Array<GeneralFinancialStatement>();
        this.cashFlowChartDataConfigs = new Map<string, ChartConfiguration['data']>();
        this.incomeStatements = new Array<GeneralFinancialStatement>();
        this.incomeChartDataConfigs = new Map<string, ChartConfiguration['data']>();
        this.balanceSheetStatements = new Array<GeneralFinancialStatement>();
        this.balanceSheetChartConfigs = new Map<string, ChartConfiguration['data']>();
        this.quarterlyStatementConfigs = new Map<string, ChartConfiguration['data']>();
        this.reportingPeriods = new Map<string, string>(Object.entries(ReportingPeriod));
    }

    ngOnInit(): void {
        
    }

    public onTickerSearch(): void {
        this.priceHistories.clear();
        this.dividendHistory = new Array<Dividend>();
        this.cashFlowStatements = new Array<GeneralFinancialStatement>();
        this.incomeStatements = new Array<GeneralFinancialStatement>();
        this.balanceSheetStatements = new Array<GeneralFinancialStatement>();
        this.selectedTimePeriodOption = ChartTimePeriods.OneYear;
        if (this.ticker && this.ticker !== '') {
            const start = AppUtil.yearsAgoFromToday(1);
            const today = new Date();
            combineLatest([
                this.stocksService.fetchQuoteByTicker(this.ticker),
                this.stocksService.fetchTickerHistoricalPrices(start, today, this.ticker),
                this.stocksService.fetchDividendDataByTicker(this.ticker),
                this.stocksService.fetchCashFlowStatements(this.ticker, ReportingPeriod.Annual, 10),
                this.stocksService.fetchIncomeStatements(this.ticker, ReportingPeriod.Annual, 10),
                this.stocksService.fetchBalanceSheetStatements(this.ticker, ReportingPeriod.Annual, 10)
            ]).pipe(tap(([quote, intervals, dividends, cashFlowStatements, incomeStatements, balanceSheetStatements]) => {
                intervals.reverse();
                this.priceHistories.set(this.selectedTimePeriodOption, intervals);
                this.quote = quote;
                this.dividendHistory.push(...dividends);
                this.cashFlowStatements.push(...cashFlowStatements);
                this.cashFlowStatementKeys.forEach(cat => {
                    this.cashFlowChartDataConfigs.set(cat, 
                        this.createChartConfigForFinancialStatementCat(
                            cat, cashFlowTermsOfInterest, this.cashFlowStatementKeys, this.cashFlowStatements
                        )
                    );
                });
                this.incomeStatements.push(...incomeStatements);
                this.incomeStatementKeys.forEach(cat => {
                    this.incomeChartDataConfigs.set(cat, 
                        this.createChartConfigForFinancialStatementCat(
                            cat, incomeTermsOfInterest, this.incomeStatementKeys, this.incomeStatements
                        )
                    );
                });
                this.balanceSheetStatements.push(...balanceSheetStatements);
                this.balanceSheetStatementKeys.forEach(cat => {
                    this.balanceSheetChartConfigs.set(cat,
                        this.createChartConfigForFinancialStatementCat(
                            cat, balanceSheetTermsOfInterest, this.balanceSheetStatementKeys, this.balanceSheetStatements
                        )
                    );
                })
            })).subscribe(() => this.prepareInitChartConfig());
        }
    }

    public chartPopUpClickAction(key?: string) {
        this.shouldOpenChartModal = !this.shouldOpenChartModal;
        if (!key) {
            key = '';
            this.selectedReportingPeriod = ReportingPeriod.Annual;
        }
        if (this.shouldOpenChartModal && key) {
            this.activeSelectedKey = key;
            this.setAnnualDataConfig(key);
        }
    }

    public isSelectedReportingPeriod(period: string): boolean {
        return this.reportingPeriods.get(period) === this.selectedReportingPeriod;
    }

    public onSelectedReportingPeriodChange(period: string) {
        if (this.reportingPeriods.has(period)) {
            this.selectedReportingPeriod = this.reportingPeriods.get(period) ?? ReportingPeriod.Annual;
        }
        if (this.activeSelectedKey !== '') {
            switch(this.selectedReportingPeriod) {
                case ReportingPeriod.Annual: 
                    this.setAnnualDataConfig(this.activeSelectedKey);
                    break;
                case ReportingPeriod.Quarterly:
                    if (this.quarterlyStatementConfigs.has(this.activeSelectedKey)) {
                        this.chartDataConfigForPopUp = this.quarterlyStatementConfigs.get(this.activeSelectedKey);
                    } else {
                        if (Object.keys(cashFlowTermsOfInterest).find(keyTerm => keyTerm === this.activeSelectedKey)) {
                            this.stocksService.fetchCashFlowStatements(
                                this.ticker,
                                ReportingPeriod.Quarterly,
                                25
                            ).subscribe((quarterlyCashFlowStatements: Array<GeneralFinancialStatement>) => {
                                const quarterlyDataConfig = this.createChartConfigForFinancialStatementCat(
                                    this.activeSelectedKey, cashFlowTermsOfInterest, this.cashFlowStatementKeys, quarterlyCashFlowStatements
                                );
                                this.quarterlyStatementConfigs.set(this.activeSelectedKey, quarterlyDataConfig);
                                this.chartDataConfigForPopUp = quarterlyDataConfig;
                            });
                        } else if (Object.keys(incomeTermsOfInterest).find(keyTerm => keyTerm === this.activeSelectedKey)) {
                            this.stocksService.fetchIncomeStatements(
                                this.ticker,
                                ReportingPeriod.Quarterly,
                                25
                            ).subscribe((quarterlyIncomeStatement: Array<GeneralFinancialStatement>) => {
                                const quarterlyDataConfig = this.createChartConfigForFinancialStatementCat(
                                    this.activeSelectedKey, incomeTermsOfInterest, this.incomeStatementKeys, quarterlyIncomeStatement
                                );
                                this.quarterlyStatementConfigs.set(this.activeSelectedKey, quarterlyDataConfig);
                                this.chartDataConfigForPopUp = quarterlyDataConfig;
                            });
                        } else if (Object.keys(balanceSheetTermsOfInterest).find(keyTerm => keyTerm === this.activeSelectedKey)) {
                            this.stocksService.fetchBalanceSheetStatements(
                                this.ticker,
                                ReportingPeriod.Quarterly,
                                25
                            ).subscribe((quarterlyBalanceSheetStatement: Array<GeneralFinancialStatement>) => {
                                const quarterlyDataConfig = this.createChartConfigForFinancialStatementCat(
                                    this.activeSelectedKey, balanceSheetTermsOfInterest, this.balanceSheetStatementKeys, quarterlyBalanceSheetStatement
                                );
                                this.quarterlyStatementConfigs.set(this.activeSelectedKey, quarterlyDataConfig);
                                this.chartDataConfigForPopUp = quarterlyDataConfig;
                            });
                        }
                    }
            }
        }
    }

    public get reportingPeriodKeys(): string[] {
        return Array.from(this.reportingPeriods.keys());
    }

    public onTimePeriodChange(timePeriod: string) {
        this.selectedTimePeriodOption = timePeriod;
        this.prepareInitChartConfig();
    }

    public round(n: number): number {
        return AppUtil.round(n, 2);
    }

    public dateFormat(date: string): string {
        return date ? AppUtil.getFormattedDate(new Date(date)) : '-';
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

    public get cashFlowStatementKeys(): string[] {
        return Object.keys(cashFlowTermsOfInterest).filter(key => !this.isDataSetEmpty(key, this.cashFlowStatements));
    }

    public get incomeStatementKeys(): string[] {
        return Object.keys(incomeTermsOfInterest).filter(key => !this.isDataSetEmpty(key, this.incomeStatements));
    }

    public get balanceSheetStatementKeys(): string[] {
        return Object.keys(balanceSheetTermsOfInterest).filter(key => !this.isDataSetEmpty(key, this.balanceSheetStatements));
    }

    public get cashFlowCategoryObj(): object {
        return cashFlowTermsOfInterest;
    }

    public get incomeCategoryObj(): object {
        return incomeTermsOfInterest;
    }

    public get balanceSheetCategoryObj(): object {
        return balanceSheetTermsOfInterest;
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
        const today = new Date();
        const todayFormatted = AppUtil.getFormattedDate(today);
        let distributionSchedule = 0;

        for (const div of this.dividendHistory) {
            const divDate = AppUtil.getDateFromFormat(div.date);
            if (divDate.getTime() < oneYearAgo.getTime()) {
                const price = this.quote?.price;
                if (price !== undefined) {
                    if (latestDivDate > today || todayFormatted === latestDividend.date) {
                        distributionSchedule--;
                    }
                    return AppUtil.round(latestDividend.dividend * distributionSchedule / price * 100, 2);
                }
                return 0;
            }
            distributionSchedule++;
        }
        throw new Error("Eternal Dividend Data");
    }

    public getCategoryValueByKey(cat: string, obj: object) {
        return new Map<string, string>(Object.entries(obj)).get(cat);
    }

    public getChartConfigForCashFlowCat(cat: string): ChartConfiguration['data'] {
        const config = this.cashFlowChartDataConfigs.get(cat);
        return config ?? {} as ChartConfiguration['data'];
    }

    public getChartConfigForIncomeCat(cat: string): ChartConfiguration['data'] {
        const config = this.incomeChartDataConfigs.get(cat);
        return config ?? {} as ChartConfiguration['data'];
    }

    public getChartConfigForBalanceSheetCat(cat: string): ChartConfiguration['data'] {
        const config = this.balanceSheetChartConfigs.get(cat);
        return config ?? {} as ChartConfiguration['data'];
    }

    public isDataSetEmpty(cat: string, financialStatements: Array<GeneralFinancialStatement>): boolean {
        const data = financialStatements.map(fs => fs[cat]);
        const filteredData = data.filter(value => value !== undefined && value !== 0);        
        return filteredData.length === 0;
    }

    private setAnnualDataConfig(key: string) {
        Object.keys(cashFlowTermsOfInterest).forEach((keyTerm: string) => {
            if (keyTerm === key) {
                const dataConfig = this.cashFlowChartDataConfigs.get(key);
                if (dataConfig) {
                    this.chartDataConfigForPopUp = dataConfig;
                    return;
                }
            }
        });
        Object.keys(incomeTermsOfInterest).forEach((keyTerm: string) => {
            if (keyTerm === key) {
                const dataConfig = this.incomeChartDataConfigs.get(key);
                if (dataConfig) {
                    this.chartDataConfigForPopUp = dataConfig;
                    return;
                }
            }
        });
        Object.keys(balanceSheetTermsOfInterest).forEach((keyTerm: string) => {
            if (keyTerm === key) {
                const dataConfig = this.balanceSheetChartConfigs.get(key);
                if (dataConfig) {
                    this.chartDataConfigForPopUp = dataConfig;
                    return;
                }
            }
        });
    }

    private createChartConfigForFinancialStatementCat(cat: string, catNames: object, catKeys: string[], finStatements: Array<GeneralFinancialStatement>) {
        if (catKeys.length !== 0 && cat in catNames) {
            return {
                datasets: [{
                    data: finStatements.map(fs => fs[cat]).reverse(),
                    fill: false,
                    borderColor: '#3485d1',
                    backgroundColor: '#3485d1',
                    tension: 0,
                    label: undefined,
                    pointRadius: 0
                }],
                labels: finStatements.map(cfs => cfs.date).reverse()
            } as ChartConfiguration['data'];
        }
        return {} as ChartConfiguration['data'];
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
            default: throw new Error('Invalid Time Period Option ' + this.selectedTimePeriodOption);
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
