export class ShareCount {
    public date: string;
    public floatShares: string;
    public freeFloat: string;
    public outstandingShares: string;
    public source: string;
    public symbol: string;

    constructor({
        date,
        floatShares,
        freeFloat,
        outstandingShares,
        source,
        symbol
    }: ShareCount) {
        this.date = date;
        this.floatShares = floatShares;
        this.freeFloat = freeFloat;
        this.outstandingShares = outstandingShares;
        this.source = source;
        this.symbol = symbol;
    }
}