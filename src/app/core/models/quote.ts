export class Quote {
    public symbol: string;
    public name: string;
    public price: number;
    public changesPercentage: number;
    public change: number;
    public dayLow:number;
    public dayHigh: number;
    public yearHigh: number;
    public yearLow: number;
    public marketCap:number;
    public volume: number;
    public open: number;
    public previousClose: number;
    public eps: number;
    public pe: number;
    public earningsAnnouncement: string;
    public sharesOutstanding: number;
    public timestamp: number;

    constructor({symbol, name, price, changesPercentage, change, dayLow, dayHigh, yearHigh, yearLow, marketCap, volume, open, previousClose, eps, pe, earningsAnnouncement, sharesOutstanding, timestamp}: Quote) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.changesPercentage = changesPercentage;
        this.change = change;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
        this.yearHigh = yearHigh;
        this.yearLow = yearLow;
        this.marketCap = marketCap;
        this.volume = volume;
        this.open = open;
        this.previousClose = previousClose;
        this.eps = eps;
        this.pe = pe;
        this.earningsAnnouncement = earningsAnnouncement;
        this.sharesOutstanding = sharesOutstanding;
        this.timestamp = timestamp;
    }
}