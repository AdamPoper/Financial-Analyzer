import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { BONDS_TEST_DATA } from "../test-data/bonds-test-data";
import { Bond, BondInterface, BondNames } from "../models/bond";

@Injectable({providedIn: 'root'})
export class BondsService {

    constructor(private http: HttpClient) {

    }

    fetchUSTreasuries(): Observable<Array<Bond>> {
        return of(BONDS_TEST_DATA)
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

                    for (const key of dataSet1.keys()) {
                        const yield1 = dataSet1.get(key);
                        const yield2 = dataSet2.get(key);

                        let yieldChange = 0;
                        if (yield1 !== undefined && yield2 !== undefined) {
                            yieldChange = yield1 - yield2;
                        }

                        const name = bondNames.get(key);
                        const params = {
                            label: key,
                            title: name !== undefined ? name : '',
                            yieldChange
                        };

                        bonds.push(new Bond(params));
                    }
                }

                return bonds;
            }));
    }
}