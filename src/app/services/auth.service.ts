import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {ParentModal} from './parentModal.service';
import {SitterModalService} from './sitterModal.service';

@Injectable({
  providedIn: 'root'
})

export  class AuthService {
  private userIdstatus = (localStorage.getItem('userId') || 'null');
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private isParentStatus = JSON.parse( localStorage.getItem('isParent')) || 'null';

  constructor(   public afAuth: AngularFireAuth, // Inject Firebase auth service
                 public db: AngularFireDatabase,   // Inject Firebase data base
                 public router: Router,
  ) {}

  async doRegisterAsSitter(value) {
    await this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(res => {
      console.log('success!');
      const x = new SitterModalService(value.firstName, value.lastName, value.email, value.phoneNumber, '',
        value.city, value.ZIP, value.birthday, '' , [],
        false, '', [], '', {emailSub: '', jobRequest: false, reviewsReceived: false},
        value.gender, false,
        '', '' , '' , [],
        0, [], false, []);
      firebase.database().ref('sitters').child(res.user.uid).set(x);

      this.router.navigate(['auth/signIn']); } ).catch((error) => {
      console.log(error.message);
    });
  }

  async doRegisterAsParent(value) {
    await this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(res => {
      console.log('success!');
      const x = new ParentModal(value.firstName, value.lastName, value.email, value.phoneNumber, {
        emailSub: '',
        favsAvailability: false,
        messagesReceived: false}, value.city, value.ZIP, {}, {}, {});
      firebase.database().ref('parents').child(res.user.uid).set(x);

      this.router.navigate(['auth/signIn']); } ).catch((error) => {
      console.log(error.message);
    });
  }

  doLogin(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.setLoggedIn(true).then(result => {if (result) {
        this.router.navigate([`profile/parent/${this.userIdstatus}`]);
      } else {this.router.navigate([`profile/sitter/${this.userIdstatus}`]); } });
    }, err => {
      console.log(err);
    });
  }

  async setLoggedIn(value: boolean) {
    return new Promise(((resolve, reject) => {
      this.loggedInStatus = value;
      localStorage.setItem('loggedIn', 'true');
      this.afAuth.authState.subscribe(user => {
        if (user) {
          localStorage.setItem('userId', user.uid);
          this.userIdstatus = user.uid;
          const ref = firebase.database().ref('parents');
          ref.child(`${user.uid}`).once('value', snapshot => {
            if (snapshot.exists()) {
              this.isParentStatus = true;
              localStorage.setItem('isParent', 'true');
            } else {
              this.isParentStatus = false;
              localStorage.setItem('isParent', 'false');
            }
            }
          );
          resolve(this.isParentStatus);
        }
      });
    }));
  }

  async setLoggedOut(value: boolean) {
    await firebase.auth().signOut().then( res => {
      this.loggedInStatus = value;
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('isParent');
      this.isParentStatus = null;
      this.userIdstatus = null;
    });
  }

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  get userId(): string {
    return localStorage.getItem('userId') || this.userIdstatus;
  }

  get isParent(): boolean {
    return JSON.parse(localStorage.getItem('isParent') || this.isParentStatus);
  }

  doLogout() {
    this.setLoggedOut(false);
    this.afAuth.signOut().then((res) => {
     localStorage.removeItem('user');
     this.router.navigate(['/home']).then(window.location.reload);
   }, (error) => {
     console.log('Logout error: ', error);
   });
  }


}
