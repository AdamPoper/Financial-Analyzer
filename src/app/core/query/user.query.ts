import { Query } from "@datorama/akita";
import { User } from "../models/user";
import { UserState, UserStore } from "../store/user.store";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CURRENT_USER } from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class UserQuery extends Query<UserState> {

    public currentUser$: Observable<User> = this.select(state => state.currentUser);

    constructor(protected override store: UserStore) {
        super(store);
    }

    public selectCurrentUser(): Observable<User> {
        return this.select(state => state.currentUser);
    }

    public getUser(): User {
        let user = this.getValue().currentUser;
        if (!user)  {
            user = JSON.parse(sessionStorage.getItem(CURRENT_USER));
            this.store.update({ currentUser: user });
        }
        return user;
    }
}