import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitterAccountService {

  constructor() { }

  savePI(formValue) {

    /*backend Script to update user's personal Info*/

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

    /*backend Script to update user's Password*/

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
    /*backend Script to update user's picture*/
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

  saveJI(formValue) {

    /*backend Script to update user's job Info*/

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

  saveAM(formValue) {

    /*backend Script to update user's AboutMe paragraph*/

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

  saveAV(formValue) {

    /*backend Script to update user's Availability Info*/

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
