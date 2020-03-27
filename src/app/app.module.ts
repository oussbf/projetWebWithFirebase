import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import { DocsComponent } from './docs/docs.component';

const appRoutes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'news', component: NewsComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'docs', component: DocsComponent},
   { path: 'auth/signIn', component: SigninComponent },
   { path: 'auth/signUp', component: SignupComponent },
   { path: '**', redirectTo: 'home'}
 ];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NewsComponent,
    ContactComponent,
    ProfileComponent,
    DocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
