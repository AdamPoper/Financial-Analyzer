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

    public static weeksAgoFromSpecifiedDate(numWeeks: number, date: Date): Date {
        date.setDate(date.getDate() - (numWeeks * 7));
        return date;
    }

    public static monthsAgoFromSpecifiedDate(numMonths: number, date: Date): Date {
        date.setMonth(date.getMonth() - numMonths);
        return date;
    }

    public static yearsAgoFromSpecifiedDate(numYears: number, date: Date): Date {
        return this.weeksAgoFromSpecifiedDate(52 * numYears, date);
    }

    public static weeksAgoFromToday(numWeeks: number): Date {
        return this.weeksAgoFromSpecifiedDate(numWeeks, new Date());
    }

    public static monthsAgoFromToday(numMonths: number): Date {
        return this.monthsAgoFromSpecifiedDate(numMonths, new Date());
    }

    public static yearsAgoFromToday(numYears: number): Date {
        return this.weeksAgoFromSpecifiedDate(52 * numYears, new Date());
    }

    public static round(value: number, decimalPlaces: number): number {
        const n = Math.pow(10, decimalPlaces);
        return Math.round(value * n) / n;
    }
}