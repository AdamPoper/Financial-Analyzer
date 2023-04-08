export class Historical<T> {
    public symbol: string;
    public historical: T[];

    constructor({
        symbol,
        historical
    }: Historical<T>) {
        this.symbol = symbol;
        this.historical = historical;
    }
}