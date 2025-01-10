import { Query } from "@datorama/akita";
import { User } from "../models/user";
import { UserState, UserStore } from "../store/user.store";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserQuery extends Query<UserState> {

    public currentUser$: Observable<User> = this.select(state => state.currentUser);

    constructor(protected override store: UserStore) {
        super(store);
    }

    public selectCurrentUser() {
        return this.select(state => state.currentUser);
    }
}