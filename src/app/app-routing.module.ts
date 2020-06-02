import { LoginComponent } from './login-flow/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './login-flow/sign-up/sign-up.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
        {   path: '', component: HomeComponent, pathMatch: 'full' },
        {
            path: 'profile',
            component: ProfileComponent,
            pathMatch: 'full',
            canActivate: [AngularFireAuthGuard],
            data: { authGuardPipe: redirectUnauthorizedToHome }
        },
        {   path: 'login',
            component: LoginComponent,
            pathMatch: 'full'
        },
        {   path: 'sign-up',
            component: SignUpComponent,
            pathMatch: 'full'

        },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
