export class IncomeStatement {
    public date: string;
    public symbol: string;
    public reportedCurrency: string;
    public cik: string;
    public fillingDate: string;
    public acceptedDate: string;
    public calendarYear: string;
    public period: string;
    public revenue: number;
    public costOfRevenue: number;
    public grossProfit: number;
    public grossProfitRatio: number;
    public researchAndDevelopmentExpenses: number;
    public generalAndAdministrativeExpenses: number;
    public sellingAndMarketingExpenses: number;
    public sellingGeneralAndAdministrativeExpenses: number;
    public otherExpenses: number;
    public operatingExpenses: number;
    public costAndExpenses: number;
    public interestIncome: number;
    public interestExpense: number;
    public depreciationAndAmortization: number;
    public ebitda: number;
    public ebitdaratio: number;
    public operatingIncome: number;
    public operatingIncomeRatio: number;
    public totalOtherIncomeExpensesNet: number;
    public incomeBeforeTax: number;
    public incomeBeforeTaxRatio: number;
    public incomeTaxExpense: number;
    public netIncome: number;
    public netIncomeRatio: number;
    public eps: number;
    public epsdiluted: number;
    public weightedAverageShsOut: number;
    public weightedAverageShsOutDil: number;
    public link: number;
    public finalLink: number;

    constructor({
        date,
        symbol,
        reportedCurrency,
        cik,
        fillingDate,
        acceptedDate,
        calendarYear,
        period,
        revenue,
        costOfRevenue,
        grossProfit,
        grossProfitRatio,
        researchAndDevelopmentExpenses,
        generalAndAdministrativeExpenses,
        sellingAndMarketingExpenses,
        sellingGeneralAndAdministrativeExpenses,
        otherExpenses,
        operatingExpenses,
        costAndExpenses,
        interestIncome,
        interestExpense,
        depreciationAndAmortization,
        ebitda,
        ebitdaratio,
        operatingIncome,
        operatingIncomeRatio,
        totalOtherIncomeExpensesNet,
        incomeBeforeTax,
        incomeBeforeTaxRatio,
        incomeTaxExpense,
        netIncome,
        netIncomeRatio,
        eps,
        epsdiluted,
        weightedAverageShsOut,
        weightedAverageShsOutDil,
        link,
        finalLink
    }: IncomeStatement) {
        this.date = date;
        this.symbol = symbol;
        this.reportedCurrency = reportedCurrency;
        this.cik = cik;
        this.fillingDate = fillingDate;
        this.acceptedDate = acceptedDate;
        this.calendarYear = calendarYear;
        this.period = period;
        this.revenue = revenue;
        this.costOfRevenue = costOfRevenue;
        this.grossProfit = grossProfit;
        this.grossProfitRatio = grossProfitRatio;
        this.researchAndDevelopmentExpenses = researchAndDevelopmentExpenses;
        this.generalAndAdministrativeExpenses = generalAndAdministrativeExpenses;
        this.sellingAndMarketingExpenses = sellingAndMarketingExpenses;
        this.sellingGeneralAndAdministrativeExpenses = sellingGeneralAndAdministrativeExpenses;
        this.otherExpenses = otherExpenses;
        this.operatingExpenses = operatingExpenses;
        this.costAndExpenses = costAndExpenses;
        this.interestIncome = interestIncome;
        this.interestExpense = interestExpense;
        this.depreciationAndAmortization = depreciationAndAmortization;
        this.ebitda = ebitda;
        this.ebitdaratio = ebitdaratio;
        this.operatingIncome = operatingIncome;
        this.operatingIncomeRatio = operatingIncomeRatio;
        this.totalOtherIncomeExpensesNet = totalOtherIncomeExpensesNet;
        this.incomeBeforeTax = incomeBeforeTax;
        this.incomeBeforeTaxRatio = incomeBeforeTaxRatio;
        this.incomeTaxExpense = incomeTaxExpense;
        this.netIncome = netIncome;
        this.netIncomeRatio = netIncomeRatio;
        this.eps = eps;
        this.epsdiluted = epsdiluted;
        this.weightedAverageShsOut = weightedAverageShsOut;
        this.weightedAverageShsOutDil = weightedAverageShsOutDil;
        this.link = link;
        this.finalLink = finalLink;
    }
}