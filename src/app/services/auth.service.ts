import { Injectable } from '@angular/core';

@Injectable()

export  class AuthService {
  constructor(  /*public afAuth: AngularFireAuth*/) {
  }

  doRegisterAsSitter(value) {
    /*return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(VALUES)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })*/
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(true);
          }, 2000
        );
      }
    );
  }

  doRegisterAsParent(value) {
    /*return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(VALUES)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })*/
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(true);
          }, 2000
        );
      }
    );
  }

  doLogin(value) {
   /* return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });*/
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(true);
          }, 2000
        );
      }
    );
  }

  doLogout() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(true);
          }, 2000
        );
      }
    );
    /*return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });*/
  }

}
