import { AuthGuard } from './services/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login-flow/login/login.component';
import { SignUpComponent } from './login-flow/sign-up/sign-up.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';

@NgModule({
declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent
],
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StoreModule.forRoot({}, {})
],
providers: [
    AuthService,
    AuthGuard,
    AngularFirestore
],
bootstrap: [AppComponent]
})
export class AppModule { }
