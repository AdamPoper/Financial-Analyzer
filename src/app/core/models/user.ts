export class User {
    id: number;
    username: string;

    constructor(args: any) {
        Object.assign(this, args);
    }
}