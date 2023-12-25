import { Subscription, SubscriptionLike } from "rxjs";

export class SubSink extends Subscription {
    set sink(sub: SubscriptionLike) {
        this.add(sub);
    }
}