export class Index {
    public symbol: string;
    public name: string;
    public price: number;
    public changesPercentage: number;
    public dayLow: number;
    public dayHigh: number;
    public yearHigh: number;
    public yearLow: number;
    public marketCap: number;
    public priceAvg50: number;
    public priceAvg200: number;
    public exchange: string;
    public volume: number;
    public avgVolume: number;
    public open: number;
    public previousClose: number;
    public eps: number;
    public pe: number;
    public earningsAnnouncement: number;
    public sharesOutstanding: number;
    public timestamp: number;

    constructor({symbol, name, price, changesPercentage, dayLow, dayHigh, yearHigh, yearLow, marketCap, priceAvg50, priceAvg200, exchange, volume, avgVolume, open, previousClose, eps, pe, earningsAnnouncement, sharesOutstanding, timestamp}: Index) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.changesPercentage = changesPercentage;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
        this.yearLow = yearLow;
        this.yearHigh = yearHigh;
        this.marketCap = marketCap;
        this.priceAvg50 = priceAvg50;
        this.priceAvg200 = priceAvg200;
        this.exchange = exchange;
        this.volume = volume;
        this.avgVolume = avgVolume;
        this.open = open;
        this.previousClose = previousClose;
        this.eps = eps;
        this.pe = pe;
        this.earningsAnnouncement = earningsAnnouncement;
        this.sharesOutstanding = sharesOutstanding;
        this.timestamp = timestamp;
    }
}