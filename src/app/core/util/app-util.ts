export class AppUtil {

    private constructor() {}

    public static getFormattedDate(date: Date): string {
        if (date !== null && date !== undefined) {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        }
        throw new Error('Date is null or undefined');
    }

    public static getDateFromFormat(formattedDate: string): Date {
        const splits = formattedDate.split('-');

        if (splits[0].length !== 4 || splits[1].length !== 2 || splits[2].length !== 2) {
            throw new Error('Cannot parse formatted date, must be YYYY-MM-DD');
        }

        return new Date(parseInt(splits[0]), parseFloat(splits[1]) - 1, parseFloat(splits[2]));
    }

    public static weeksAgoFromToday(numWeeks: number) {
        const today = new Date();
        today.setDate(today.getDate() - (numWeeks * 7));
        return today;
    }

    public static monthsAgoFromToday(numMonths: number) {
        return this.weeksAgoFromToday(4 * numMonths);
    }

    public static yearsAgoFromToday(numYears: number) {
        return this.monthsAgoFromToday(12 * numYears);
    }

    public static round(value: number, decimalPlaces: number): number {
        const n = Math.pow(10, decimalPlaces);
        return Math.round(value * n) / n;
    }
}