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
        return of(INDEX_TEST_DATA).pipe(map((indices: Index[]) => indices.map(index => new Index(index))));
    }
}