

export class Index {
    public symbol: string;
    public name: string;
    public price: number;
    public changesPercentage: number;
    public dayLow: number;
    public dayHigh: number;
    public yearHigh: number;
    public yearLow: number;

    constructor({symbol, name, price, changesPercentage, dayLow, dayHigh, yearHigh, yearLow}: { 
        symbol: string; 
        name: string; 
        price: number; 
        changesPercentage: number; 
        dayLow: number; 
        dayHigh: number; 
        yearHigh: number; 
        yearLow: number; 
    }) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.changesPercentage = changesPercentage;
        this.dayLow = dayLow;
        this.dayHigh = dayHigh;
        this.yearLow = yearLow;
        this.yearHigh = yearHigh;
    }
}
