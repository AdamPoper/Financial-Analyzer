import { HttpClient } from "@angular/common/http";
import { UserStore } from "../store/user.store";
import { Observable, tap } from "rxjs";
import { User } from "../models/user";
import { ProxyConfig } from "src/app/proxy.config";

export class AuthenticationService {

    constructor(private http: HttpClient, private userStore: UserStore) { 

    }

    public login(username: string, password: string): Observable<any> {
        return this.http.post<User>(`${ProxyConfig.url}/authenticate`, { username, password })
            .pipe(tap((user: User) => this.userStore.update({ currentUser: user })));
    }
  
    public logout(): void {
        // this.userStore.update({ currentUser: null });
    }
}