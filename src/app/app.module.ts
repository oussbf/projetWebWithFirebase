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


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile/sitterId', component: SitteridComponent },
  { path: 'profile/parentId', component: ParentIdComponent },
  { path: 'auth/signIn', component: SigninComponent },
  { path: 'viewprofile/sitter', component: SitterComponent },
  { path: 'viewprofile/parent', component: ParentComponent },
  { path: 'auth/parent/signUp', component: SignUpAComponent  },
  { path: 'auth/sitter/signUp', component: SignUpBComponent  },
  { path: 'pageNotFound', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'home'}

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
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
