import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { ProxyConfig } from "src/app/proxy.config";
import { WatchList } from "../models/watchList";
import { Injectable } from "@angular/core";
import { WatchListEntry } from "../models/watchListEntry";
import { UserQuery } from "../query/user.query";

type SimpleResponse = {
    msg: string;
}

@Injectable({ providedIn: 'root' })
export class WatchListService {

    constructor(private http: HttpClient,
                private userQuery: UserQuery
    ) { }

    public fetchAllWatchLists(): Observable<WatchList[]> {
        const id = this.userQuery.getUser().id;
        const params = new HttpParams().set('userId', id);
        return this.http.get<WatchList[]>(`${ProxyConfig.url}/watch-list/get`, {params})    
    }

    public fetchAllEntriesByWatchListId(id: string): Observable<WatchListEntry[]> {
        const userId = this.userQuery.getUser().id;
        const params = new HttpParams().set('userId', userId);
        return this.http.get<WatchListEntry[]>(`${ProxyConfig.url}/watch-list/get-entries/${id}`, {params})
    }

    public deleteWatchList(id: string): Observable<any> {
        const params = new HttpParams().set('userId', this.userQuery.getUser().id);
        return this.http.delete<any>(`${ProxyConfig.url}/watch-list/delete/${id}`, {params})
            .pipe(map(res => res.message));
    }

    public addSymbolToWatchList(watchListId: string, symbol: string): Observable<any> {
        const body = {watchListId, symbol};
        const params = new HttpParams().set('userId', this.userQuery.getUser().id);
        return this.http.post<any>(
            `${ProxyConfig.url}/watch-list/add-entry`,
            body,
            {params}
        ).pipe(map(res => res.message));
    }

    public createNewWatchList(listName: string): Observable<any> {
        const id = this.userQuery.getUser().id;
        const body = {user_id: id, name: listName};
        const params = new HttpParams().set('userId', id);
        return this.http.post<any>(
            `${ProxyConfig.url}/watch-list/add`,
            body,
            {params}
        ).pipe(map(res => res.message));
    }

    public removeSymbolFromWatchList(entryId: string): Observable<any> {
        const params = new HttpParams().set('userId', this.userQuery.getUser().id);
        return this.http.delete<any>(`${ProxyConfig.url}/watch-list/delete-entry/${entryId}`, {params})
            .pipe(map(res => res.message));
    }
}