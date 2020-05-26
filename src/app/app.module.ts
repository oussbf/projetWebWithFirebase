import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule, Routes} from '@angular/router';
import { AuthService} from './services/auth.service';
import { SignUpAComponent } from './auth/parent/sign-up-a/sign-up-a.component';
import { SignUpBComponent } from './auth/sitter/sign-up-b/sign-up-b.component';
import { UiSwitchModule} from 'ngx-toggle-switch';
import { MatNativeDateModule} from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { ParentIdComponent } from './profile/parent-id/parent-id.component';
import { SitteridComponent } from './profile/sitterid/sitterid.component';
import { SearchComponent } from './search/search.component';
import { SitterComponent } from './viewprofile/sitter/sitter.component';
import { ParentComponent } from './viewprofile/parent/parent.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ParentAccountService} from './services/parent-account.service';
import {SitterAccountService} from './services/sitter-account.service';
import {AuthGuardService} from './guards/auth-guard.service';
import {HomeGuardService} from './guards/home-guard.service';
import {SearchGuardService} from './guards/search-guard.service';
import {ParentProfileGuardService} from './guards/parent-profile-guard.service';
import {SitterProfileGuardService} from './guards/sitter-profile-guard.service';
import {ReverseAuthGuardService} from './guards/reverse-auth-guard.service';
import {NgpSortModule} from 'ngp-sort-pipe';


const appRoutes: Routes = [
  { path: '', canActivate: [HomeGuardService] , component: HomeComponent },
  { path: 'home' , canActivate: [HomeGuardService] , component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'search', canActivate: [AuthGuardService, SearchGuardService], component: SearchComponent },
  { path: 'profile/sitter/:id', canActivate: [AuthGuardService, SitterProfileGuardService], component: SitteridComponent },
  { path: 'profile/parent/:id', canActivate: [AuthGuardService, ParentProfileGuardService], component: ParentIdComponent },
  { path: 'auth/signIn', canActivate: [ReverseAuthGuardService], component: SigninComponent },
  { path: 'viewprofile/sitter/:id', component: SitterComponent },
  { path: 'viewprofile/parent/:id', component: ParentComponent },
  { path: 'auth/parent/signUp', canActivate: [ReverseAuthGuardService], component: SignUpAComponent  },
  { path: 'auth/sitter/signUp', canActivate: [ReverseAuthGuardService], component: SignUpBComponent  },
  { path: 'pageNotFound', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'pageNotFound'}

];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    ContactComponent,
    SignUpAComponent,
    SignUpBComponent,
    ParentIdComponent,
    SitteridComponent,
    SearchComponent,
    SitterComponent,
    ParentComponent,
    PageNotFoundComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes),
      UiSwitchModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      NgpSortModule
    ],
  providers: [
    AuthService,
    ParentAccountService,
    SitterAccountService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
