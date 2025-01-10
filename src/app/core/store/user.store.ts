import { Store } from "@datorama/akita";
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
export class UserStore extends Store<UserState> {
    constructor() {
        super(initialState());
    }
}