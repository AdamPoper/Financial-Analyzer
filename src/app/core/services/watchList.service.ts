import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { ProxyConfig } from "src/app/proxy.config";
import { WatchList } from "../models/watchList";
import { Injectable } from "@angular/core";
import { WatchListEntry } from "../models/watchListEntry";

@Injectable({ providedIn: 'root' })
export class WatchListService {

    constructor(private http: HttpClient) {

    }

    public fetchAllWatchLists(): Observable<WatchList[]> {
        return this.http.get<WatchList[]>(`${ProxyConfig.url}/all`)
            .pipe(map((response: any) => response.watchLists));       
    }

    public fetchAllEntriesByWatchListId(id: string): Observable<WatchListEntry[]> {
        return this.http.get<WatchListEntry[]>(`${ProxyConfig.url}/entry/all/${id}`)
            .pipe(map((symbols: WatchListEntry[]) => symbols));
    }
}