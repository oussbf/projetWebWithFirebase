import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentAccountService {

  constructor() { }

  savePI(formValue) {

    /*backed Script to update user's personal Info*/

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

  saveNP(formValue) {

    /*backed Script to update user's Password*/

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

  saveKid(formValue) {

    /*backed Script to update user's kids Info*/

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
  uploadPicture(url) {
    /*backed Script to update user's picture*/
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

  updateNotifications(formValue) {

    /* verify every notification whether its checked or not and do the things in the backend */

    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(true);
          }, 1
        );
      }
    );
  }

}
