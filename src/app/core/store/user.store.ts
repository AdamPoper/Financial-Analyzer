import { Store, StoreConfig } from "@datorama/akita";
import { User } from "../models/user";
import { Injectable } from "@angular/core";

export interface UserState {
    currentUser: User;
}

const initialState = (): UserState => {
    return {
        currentUser: null
    }
}

@Injectable({providedIn: 'root'})
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
    constructor() {
        super(initialState());
    }
}