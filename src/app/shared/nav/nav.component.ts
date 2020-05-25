import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    isActive = false;
    public username: string = "User";

    constructor(private readonly authService: AuthService) {
        
    }

    ngOnInit() {
        // this.username = this.authService.userDetails.email;
    }

    public toggleNav(): void {
        this.isActive = !this.isActive;
    }

    public loggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    public logout(): void {
        this.authService.logout();
    }
}
