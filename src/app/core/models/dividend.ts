export class Dividend {
    public date: string;
    public label: string;
    public adjDividend: number;
    public dividend: number;
    public recordDate: string;
    public paymentDate: string;
    public declarationDate: string;

    constructor({
        date,
        label,
        adjDividend,
        dividend,
        recordDate,
        paymentDate,
        declarationDate,
    }: Dividend) {
        this.date = date;
        this.label = label;
        this.adjDividend = adjDividend;
        this.dividend = dividend;
        this.recordDate = recordDate;
        this.paymentDate = paymentDate;
        this.declarationDate = declarationDate;
    }
}