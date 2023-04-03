export class Interval {
    public date: string;
    public open: number;
    public high: number;
    public low: number;
    public close: number;
    public adjClose: number;
    public volume: number;
    public unadjustedVolume: number;
    public change: number;
    public changePercent: number;
    public vwap: number;
    public label: string;
    public changeOverTime: number;

    constructor({
        date,
        open,
        high,
        low,
        close,
        adjClose,
        volume,
        unadjustedVolume,
        change,
        changePercent,
        vwap,
        label,
        changeOverTime }: Interval) {
        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.adjClose = adjClose;
        this.volume = volume;
        this.unadjustedVolume = unadjustedVolume;
        this.change = change;
        this.changePercent = changePercent;
        this.vwap = vwap;
        this.label = label;
        this.changeOverTime = changeOverTime;
    }
}