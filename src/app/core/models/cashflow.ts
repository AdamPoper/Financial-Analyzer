// export class CashFlowStatement {
//     public date: string;
//     public symbol: string;
//     public reportedCurrency: string;
//     public cik: string;
//     public fillingDate: string;
//     public acceptedDate: string;
//     public calendarYear: string;
//     public period: string;
//     public netIncome: number;
//     public depreciationAndAmortization: number;
//     public deferredIncomeTax: number;
//     public stockBasedCompensation: number;
//     public changeInWorkingCapital: number;
//     public accountsReceivables: number;
//     public inventory: number;
//     public accountsPayables: number;
//     public otherWorkingCapital: number;
//     public otherNonCashItems: number;
//     public netCashProvidedByOperatingActivities: number;
//     public investmentsInPropertyPlantAndEquipment: number;
//     public acquisitionsNet: number;
//     public purchasesOfInvestments: number;
//     public salesMaturitiesOfInvestments: number;
//     public otherInvestingActivites: number;
//     public netCashUsedForInvestingActivites: number;
//     public debtRepayment: number;
//     public commonStockIssued: number;
//     public commonStockRepurchased: number;
//     public dividendsPaid: number;
//     public otherFinancingActivites: number;
//     public netCashUsedProvidedByFinancingActivities: number;
//     public effectOfForexChangesOnCash: number;
//     public netChangeInCash: number;
//     public cashAtEndOfPeriod: number;
//     public cashAtBeginningOfPeriod: number;
//     public operatingCashFlow: number;
//     public capitalExpenditure: number;
//     public freeCashFlow: number;
//     public link: string;
//     public finalLink: string;

//     constructor({
//         date,
//         symbol,
//         reportedCurrency,
//         cik,
//         fillingDate,
//         acceptedDate,
//         calendarYear,
//         period,
//         netIncome,
//         depreciationAndAmortization,
//         deferredIncomeTax,
//         stockBasedCompensation,
//         changeInWorkingCapital,
//         accountsReceivables,
//         inventory,
//         accountsPayables,
//         otherWorkingCapital,
//         otherNonCashItems,
//         netCashProvidedByOperatingActivities,
//         investmentsInPropertyPlantAndEquipment,
//         acquisitionsNet,
//         purchasesOfInvestments,
//         salesMaturitiesOfInvestments,
//         otherInvestingActivites,
//         netCashUsedForInvestingActivites,
//         debtRepayment,
//         commonStockIssued,
//         commonStockRepurchased,
//         dividendsPaid,
//         otherFinancingActivites,
//         netCashUsedProvidedByFinancingActivities,
//         effectOfForexChangesOnCash,
//         netChangeInCash,
//         cashAtEndOfPeriod,
//         cashAtBeginningOfPeriod,
//         operatingCashFlow,
//         capitalExpenditure,
//         freeCashFlow,
//         link,
//         finalLink,
//     }: CashFlowStatement) {
//         this.date = date;
//         this.symbol = symbol;
//         this.reportedCurrency = reportedCurrency;
//         this.cik = cik;
//         this.fillingDate = fillingDate;
//         this.acceptedDate = acceptedDate;
//         this.calendarYear = calendarYear;
//         this.period = period;
//         this.netIncome = netIncome;
//         this.depreciationAndAmortization = depreciationAndAmortization;
//         this.deferredIncomeTax = deferredIncomeTax;
//         this.stockBasedCompensation = stockBasedCompensation;
//         this.changeInWorkingCapital = changeInWorkingCapital;
//         this.accountsReceivables = accountsReceivables;
//         this.inventory = inventory;
//         this.accountsPayables = accountsPayables;
//         this.otherWorkingCapital = otherWorkingCapital;
//         this.otherNonCashItems = otherNonCashItems;
//         this.netCashProvidedByOperatingActivities = netCashProvidedByOperatingActivities;
//         this.investmentsInPropertyPlantAndEquipment = investmentsInPropertyPlantAndEquipment;
//         this.acquisitionsNet = acquisitionsNet;
//         this.purchasesOfInvestments = purchasesOfInvestments;
//         this.salesMaturitiesOfInvestments = salesMaturitiesOfInvestments;
//         this.otherInvestingActivites = otherInvestingActivites;
//         this.netCashUsedForInvestingActivites = netCashUsedForInvestingActivites;
//         this.debtRepayment = debtRepayment;
//         this.commonStockIssued = commonStockIssued;
//         this.commonStockRepurchased = commonStockRepurchased;
//         this.dividendsPaid = dividendsPaid;
//         this.otherFinancingActivites = otherFinancingActivites;
//         this.netCashUsedProvidedByFinancingActivities = netCashUsedProvidedByFinancingActivities;
//         this.effectOfForexChangesOnCash = effectOfForexChangesOnCash;
//         this.netChangeInCash = netChangeInCash;
//         this.cashAtEndOfPeriod = cashAtEndOfPeriod;
//         this.cashAtBeginningOfPeriod = cashAtBeginningOfPeriod;
//         this.operatingCashFlow = operatingCashFlow;
//         this.capitalExpenditure = capitalExpenditure;
//         this.freeCashFlow = freeCashFlow;
//         this.link = link;
//         this.finalLink = finalLink;
//     }
// }

export interface CashFlowStatement {
    // date: string;
    // symbol: string;
    // reportedCurrency: string;
    // cik: string;
    // fillingDate: string;
    // acceptedDate: string;
    // calendarYear: string;
    // period: string;
    // netIncome: number;
    // depreciationAndAmortization: number;
    // deferredIncomeTax: number;
    // stockBasedCompensation: number;
    // changeInWorkingCapital: number;
    // accountsReceivables: number;
    // inventory: number;
    // accountsPayables: number;
    // otherWorkingCapital: number;
    // otherNonCashItems: number;
    // netCashProvidedByOperatingActivities: number;
    // investmentsInPropertyPlantAndEquipment: number;
    // acquisitionsNet: number;
    // purchasesOfInvestments: number;
    // salesMaturitiesOfInvestments: number;
    // otherInvestingActivites: number;
    // netCashUsedForInvestingActivites: number;
    // debtRepayment: number;
    // commonStockIssued: number;
    // commonStockRepurchased: number;
    // dividendsPaid: number;
    // otherFinancingActivites: number;
    // netCashUsedProvidedByFinancingActivities: number;
    // effectOfForexChangesOnCash: number;
    // netChangeInCash: number;
    // cashAtEndOfPeriod: number;
    // cashAtBeginningOfPeriod: number;
    // operatingCashFlow: number;
    // capitalExpenditure: number;
    // freeCashFlow: number;
    // link: string;
    // finalLink: string;
    [state: string]: number | string;
    date: string;
}