import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../store/auth';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
    isActive = false;

    isAuthenticatedSubscription: Subscription;
    userSubscription: Subscription;

    public user: User = null;
    public isLoggedIn = false;


    constructor(private store: Store<fromAuth.State>) {}

    ngOnInit() {
        this.isAuthenticatedSubscription = this.store.pipe(
            select(fromAuth.selectIsLoggedIn),
            map(isAuthenticated => {
                this.isLoggedIn = isAuthenticated;
            })
        ).subscribe();

        this.userSubscription = this.store.pipe(
            select(fromAuth.selectUser),
            map(user => {
                this.user = user;
            })
        ).subscribe();
    }

    public toggleNav(): void {
        this.isActive = !this.isActive;
    }

    public logout(): void {
        this.store.dispatch(new fromAuth.Logout());
    }

    ngOnDestroy() {
        this.isAuthenticatedSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
}
