import { Injectable } from '@angular/core';
import {ParentModal} from './parentModal.service';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ParentAccountService {

  constructor(private authService: AuthService) {
  }

  savePI(formValue) {
  firebase.database().ref(`parents/${this.authService.userId}`).update({firstName: formValue.firstName,
  lastName: formValue.lastName, email: formValue.email, phoneNumber: formValue.phoneNumber})
    .then(res => {window.location.reload(); });
  }

  saveNP(formValue) {
    const currentUser = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(currentUser.email, formValue.oldPassword);
    currentUser.reauthenticateWithCredential(credentials).then(success => {currentUser.updatePassword(formValue.newPassword)
      .then( finishedUpdate => {
        window.location.reload();
        }
      );
    });
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
    if (formValue.emailSub.length) {
      firebase.database().ref(`parents/${this.authService.userId}/notifications`).update({
        emailSub: formValue.emailSub,
        favsAvailability: !formValue.favsAvailability,
        messagesReceived: !formValue.messagesReceived
      })
        .then(success => {window.location.reload(); });
    } else {
      firebase.database().ref(`parents/${this.authService.userId}/notifications`).update({emailSub: ''})
        .then(success => {window.location.reload(); });
    }
  }

  deleteMessage(idMessage) {
    firebase.database().ref(`parents/${this.authService.userId}/messages`).child(idMessage).remove()
      .then(success => {console.log('message Deleted'); });
  }

  requestJob(formValue, sitterId) {
   const ref = firebase.database().ref(`sitters/${sitterId}`).child('jobs').push();

   firebase.database().ref(`parents/${this.authService.userId}`).on('value', info => {
     const name = info.exportVal().firstName.toString();
     const phoneNbr = info.exportVal().phoneNumber.toString();
     ref.set({
     idJob: ref.key,
     id: this.authService.userId,
     jobDate: formValue.requestedDate,
     jobLength: formValue.requestedDuration,
     jobLocation: formValue.requestedLocation,
     nameSender: name,
     numChildren: formValue.requestedChildrenNbr,
     openFRJ: formValue.requestedNeedRegularJob,
     phoneNumber: phoneNbr
   });
   });

  }

  deleteFavourite(idSitter) {
    firebase.database().ref(`parents/${this.authService.userId}/favourites`).orderByChild('idFavourite').equalTo(idSitter).limitToFirst(1)
      .on('value', x => { x.ref.remove(); }  );
  }

  addToFavourites(idSitter) {
    firebase.database().ref(`parents/${this.authService.userId}/favourites`).push().set({idFavourite: idSitter})
      .then(success => {console.log('added To Favourites'); });
  }

  addKid(kidsArray: any[]) {
    kidsArray.forEach(kid => {
      if (kid.idKid.length) {
        firebase.database().ref(`parents/${this.authService.userId}/kids/${kid.idKid}`).update({
          kidName: kid.kidName,
          kidAge: kid.kidAge,
          childAge: kid.childAge,
          additionalInfo: kid.additionalInfo
          /*I NEED TO COMPLETE THE SPECIALNEEDS AND OTHERSPECIALNEED*/
        });
      } else {
        const x = firebase.database().ref(`parents/${this.authService.userId}/kids`).push();
        x.set({
          idKid : x.key,
          kidName: kid.kidName,
          kidAge: kid.kidAge,
          childAge: kid.childAge,
          additionalInfo: kid.additionalInfo
          /*I NEED TO COMPLETE THE SPECIALNEEDS AND OTHERSPECIALNEED*/
        });
      }
    });
  }

}
