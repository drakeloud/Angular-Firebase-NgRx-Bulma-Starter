import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as authActions from '../store/auth/actions';
import * as fromAuth from '../store/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    public successMessage: string = null;
    public userProfile: User = null;
    public downloadURL: Observable<string> = null;
    public profileImageUrl: string = null;
    public uploadProgress: Observable<number> = null;
    private authSubscription: Subscription = null;

    constructor(
        private store: Store<fromAuth.State>
        ) {}

    ngOnInit() {
        this.authSubscription = this.store.pipe(
            select(fromAuth.selectUser),
            map(userProfile => {
                this.userProfile = userProfile;
            })
        ).subscribe();
    }

    upload(event, userId: string): void {
        this.store.dispatch(new authActions.AddProfileImage(event.target.files[0], userId));
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
