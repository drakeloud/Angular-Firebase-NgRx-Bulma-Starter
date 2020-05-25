import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { SignUpUser, User } from '../models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private firebaseUser$: Observable<firebase.User>;
    private fbUser: firebase.User = null; // obsolete
    public user: User = null;

    constructor(
        private firebaseAuth: AngularFireAuth,
        private router: Router,
        private db: AngularFirestore) {
        this.firebaseUser$ = firebaseAuth.authState;

        this.firebaseUser$.subscribe((firebaseUser) => {
            if (firebaseUser) {
                // CRUD operations: https://dottedsquirrel.com/angular/how-to-crud-in-angular-firebase-firestore/
                // https://www.techiediaries.com/angular-firebase/angular-9-8-firestore-database-crud-tutorial/

                this.associateUserToFirebaseAuth(firebaseUser).then(() => {
                    // console.log(this.user);
                });
            } else {
                this.user = null;
            }
        });

    }

    // TODO: SECURE DATABASE
    // TODO: Secure user data with proper constraints
        // - https://firebase.google.com/docs/firestore/security/rules-query
    // TODO: add email verification !!!
    public signup(signUpUser: SignUpUser): Promise<void> {
        return this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(signUpUser.email, signUpUser.password)
            .then(userCredential => {
                this.db.collection('users').doc(userCredential.user.uid).set({
                    firstName: signUpUser.firstName,
                    lastName: signUpUser.lastName,
                    email: signUpUser.email,
                    userId: userCredential.user.uid
                }).then((res) => {
                    this.associateUserToFirebaseAuth(userCredential.user).then(() => {
                        this.router.navigate(['profile']);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    public login(email: string, password: string): Promise<void> {
        return this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                this.associateUserToFirebaseAuth(userCredential.user).then(() => {
                    this.router.navigate(['profile']);
                });
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    public logout() {
        this.firebaseAuth
            .auth
            .signOut()
            .then(() => {
                this.router.navigate(['']);
            });
    }

    public isLoggedIn(): boolean {
        if (this.user == null) { // may be able to optimize this by checking firebase Auth NOT user collection auth
            return false;
        } else {
            return true;
        }
    }

    public addProfileImage(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.collection('users', ref => ref.where('userId', '==', this.fbUser.uid)).doc(this.fbUser.uid).update({
                photoUrl: url
            }).then((res) => {
                console.log(res);
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    private associateUserToFirebaseAuth(firebaseUser: firebase.User): Promise<void> {
        this.fbUser = firebaseUser;
        return new Promise((resolve, reject) =>  {
            this.db.collection('users', ref => ref.where('userId', '==', firebaseUser.uid)).get().subscribe((documentData) => {
                if (documentData.size !== 1) {
                    // TODO: Better error handling - maybe Toastr?
                    reject('Unable to login because user not found or too many users returned!');
                }
                this.user = User.fromJson(documentData.docs[0].data());
                resolve();
            });
        });
    }
}
