import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { INDEX_TEST_DATA } from "../test-data/indices-test-data";
import { Injectable } from "@angular/core";
import { Index } from "../models";
import { map } from "rxjs";

@Injectable({providedIn: 'root'})
export class IndexService {

    constructor(private http: HttpClient) {
    }

    public fetchAllMajorIndices(): Observable<Index[]> {
        return this.http.get<Index[]>('https://financialmodelingprep.com/api/v3/quotes/index?apikey=6bdfa0e424ca10e8d42f1a07bc67669d')
            .pipe(map((indices: Index[]) => indices.map(index => new Index(index))));
    }
}