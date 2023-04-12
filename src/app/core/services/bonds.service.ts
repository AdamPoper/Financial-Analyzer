import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { BONDS_TEST_DATA } from "../test-data/bonds-test-data";
import { Bond, BondInterface, BondNames, SingleTreasuryYield } from "../models/bond";
import { AppUtil } from "../util/app-util";

@Injectable({providedIn: 'root'})
export class BondsService {

    constructor(private http: HttpClient) {

    }

    public fetchUSTreasuryHistory(
        treasuryLabel: string,
        start: Date,
        end: Date
    ): Observable<SingleTreasuryYield[]> {
        const from = AppUtil.getFormattedDate(start);
        const to = AppUtil.getFormattedDate(end);
        return this.http.get<BondInterface[]>(`https://financialmodelingprep.com/api/v4/treasury?from=${from}&to=${to}&apikey=6bdfa0e424ca10e8d42f1a07bc67669d`)
            .pipe(map((data: BondInterface[]): Array<SingleTreasuryYield> => {
                return data.map(
                    (bondYields: BondInterface) => {
                        const yields = new Map<string, number>(Object.entries(bondYields))
                        return {
                            date: bondYields.date,
                            yield: yields.get(treasuryLabel)
                        } as SingleTreasuryYield;
                    }
                )
            }));      
    }

    public fetchUSTreasuries(): Observable<Array<Bond>> {
        const from = new Date();
        const to = AppUtil.weeksAgoFromToday(1);
        return this.http.get<BondInterface[]>(`https://financialmodelingprep.com/api/v4/treasury?from=${from}&to=${to}&apikey=6bdfa0e424ca10e8d42f1a07bc67669d`)
            .pipe(map((bondData: BondInterface[]) => {
                const bonds = new Array<Bond>();
                
                if (bondData !== null && bondData !== undefined && bondData.length > 1) {
                    
                    if (bondData[0]["date"] !== undefined) {
                        delete bondData[0]["date"];
                    }

                    if (bondData[1]["date"] !== undefined) {
                        delete bondData[1]["date"];
                    }

                    const bondNames = new Map<string, string>(Object.entries(BondNames));
                    const dataSet1 = new Map<string, number>(Object.entries(bondData[0]));
                    const dataSet2 = new Map<string, number>(Object.entries(bondData[1]));
                    const treasuryLabels = Array.from(dataSet1.keys());

                    for (const key of treasuryLabels) {
                        const yield1 = dataSet1.get(key) ?? 0.0;
                        const yield2 = dataSet2.get(key);

                        let yieldChange = 0;
                        if (yield1 !== undefined && yield2 !== undefined) {
                            yieldChange = yield1 - yield2;
                        }

                        const name = bondNames.get(key);
                        const params = {
                            label: key,
                            title: name !== undefined ? name : '',
                            couponRate: yield1,
                            yieldChange
                        };

                        bonds.push(new Bond(params));
                    }
                }

                return bonds;
            }));
    }
}