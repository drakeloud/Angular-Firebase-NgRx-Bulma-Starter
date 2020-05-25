import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public successMessage: string = null;
    public userProfile: User = null;

    public downloadURL: Observable<string> = null;
    public profileImageUrl: string = null;
    public uploadProgress: Observable<number> = null;

    constructor(
        private readonly authService: AuthService,
        private readonly fireStorage: AngularFireStorage
        ) {}

    ngOnInit() {
        this.userProfile = this.authService.user;
        if (this.userProfile.photoUrl && this.userProfile.photoUrl !== '') {
            this.profileImageUrl = this.userProfile.photoUrl;
        }
    }

    upload(event) {
        const ref = this.fireStorage.ref(`users/${this.userProfile.userId}}`);
        const task = ref.put(event.target.files[0]).then((snapshot) => {
            ref.getDownloadURL().subscribe((url) => {
                this.profileImageUrl = url;
                this.authService.addProfileImage(url);
            });
        });
    }
}
