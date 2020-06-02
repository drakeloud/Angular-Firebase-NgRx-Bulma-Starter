import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { SignUpUser } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth/actions';
import * as fromAuth from '../store/auth';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private readonly firebaseAuth: AngularFireAuth,
                private store: Store<fromAuth.State>,
                private readonly db: AngularFirestore,
                private readonly fireStorage: AngularFireStorage
                ) {
        this.firebaseAuth.authState.subscribe((firebaseUser) => {
            if (firebaseUser && firebaseUser.uid) {
                this.store.dispatch(new authActions.LoginSuccess(firebaseUser.uid));
            }
        });
    }

    public signup(signUpUser: SignUpUser): Observable<firebase.auth.UserCredential> {
        return from(this.firebaseAuth.auth.createUserWithEmailAndPassword(signUpUser.email, signUpUser.password));
    }

    public login(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password));
    }

    public saveUserDataToSignupUser(signUpUser: SignUpUser, userid: string): Observable<void> {
        return from(this.db.collection('users').doc(userid).set({
            firstName: signUpUser.firstName,
            lastName: signUpUser.lastName,
            email: signUpUser.email,
            userId: userid
        }));
    }

    public loadUser(userUid: string): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
        return this.db.collection('users', ref => ref.where('userId', '==', userUid)).get();
    }

    public logout(): Observable<void> {
        return from(this.firebaseAuth
            .auth
            .signOut());
    }

    public addProfileImage(userId: string, image: any): Observable<string> {
        const ref = this.fireStorage.ref(`users/${userId}}`);

        return new Observable(obs => {
            try {
                ref.put(image).then((snapshot) => {
                    ref.getDownloadURL().subscribe((url) => {
                        this.db.collection('users', reference => reference.where('userId', '==', userId)).doc(userId).update({
                            photoUrl: url
                        });
                        obs.next(url);
                    });
                });
            } catch (err) {
                obs.error(err);
            }
        });
    }
}
