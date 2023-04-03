import { Injectable } from "@angular/core";
import { IS_MARKET_OPEN_TEST_DATA } from "../test-data/market-open-test-data";
import { Observable, map, of } from "rxjs";
import { AppUtil } from "../util/app-util";

@Injectable({providedIn: 'root'})
export class GeneralMarketService {

    constructor() {

    }

    public fetchIsMarketOpen(): Observable<boolean> {
        return of(IS_MARKET_OPEN_TEST_DATA)
            .pipe(map((data: any) => {
                const today = new Date();
                const holidaysData = data["stockMarketHolidays"];
                if (holidaysData !== undefined) {
                    const thisYear = today.getFullYear();
                    for (const holidays of holidaysData) {
                        const year = holidays["year"];
                        if (year !== undefined && year === thisYear) {
                            const formattedDate = AppUtil.getFormattedDate(today);
                            for (const holiday of Object.keys(holidays)) {
                                if (holidays[holiday] === formattedDate) {
                                    return false;
                                }
                            }
                        }
                    }
                }

                if (today.getDay() === 0 || today.getDay() === 6) {
                    return false;
                }

                const openingHour = 9;
                const openingMinute = 30;
                const closingHour = 16;
                const closingMinute = 0;

                const options = {timeZone: 'America/New_York'};
                const currentEastCoastDate = new Date(today.toLocaleString('en_US', options));

                const currentHour = currentEastCoastDate.getHours();
                const currentMinute = currentEastCoastDate.getMinutes();

                if (currentHour < openingHour && currentMinute < openingMinute) {
                    return false;
                }

                if (currentHour > closingHour && currentMinute > closingMinute) {
                    return false;
                }

                return true;
            }))
    }
}