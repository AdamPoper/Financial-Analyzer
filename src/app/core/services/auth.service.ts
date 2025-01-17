import { HttpClient, HttpParams } from "@angular/common/http";
import { UserStore } from "../store/user.store";
import { map, Observable, tap } from "rxjs";
import { User } from "../models/user";
import { ProxyConfig } from "src/app/proxy.config";
import { Injectable } from "@angular/core";

type ErrorResponse = {message: string};
type ApiResponse = User | ErrorResponse;

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private http: HttpClient, private userStore: UserStore) { 

    }

    public login(username: string, password: string): Observable<boolean> {
        const params = new HttpParams()
            .set('username', username)
            .set('password', password);

        return this.http.get<ApiResponse>(`${ProxyConfig.url}/authenticate`, { params })
            .pipe(map((res: ApiResponse) => {
                if ((res as User).username) {
                    this.userStore.update({ currentUser: res as User });
                    return true;
                } else {
                    alert((res as ErrorResponse).message);
                    return false;
                }
            }));
    }
  
    public logout(): void {
        // this.userStore.update({ currentUser: null });
    }
}