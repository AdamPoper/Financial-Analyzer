export interface BondInterface {
    "date"?: string;
    "month1" : number;
    "month2" : number;
    "month3" : number;
    "month6" : number;
    "year1"  : number;
    "year2"  : number;
    "year3"  : number;
    "year5"  : number;
    "year7"  : number;
    "year10" : number;
    "year20" : number;
    "year30" : number;
}

export const BondNames = {
    "month1": "US 1 Month",
    "month2": "US 2 Month",
    "month3": "US 3 Month",
    "month6": "US 6 Month",
    "year1" : "US 1 Year",
    "year2" : "US 2 Year",
    "year3" : "US 3 Year",
    "year5" : "US 5 Year",
    "year7" : "US 7 Year",
    "year10": "US 10 Year",
    "year20": "US 20 Year",
    "year30": "US 30 Year",
}

export class Bond {
    public label: string;
    public title: string;
    public yieldChange: number;

    constructor({label, title, yieldChange}: {
        label: string; title: string; yieldChange: number
    }) {
        this.label = label;
        this.title = title;
        this.yieldChange = yieldChange;
    }
}