import { Injectable } from '@angular/core';
import {ParentModal} from './parentModal.service';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {FormArray} from '@angular/forms';

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
        favsAvailability: (formValue.favsAvailability),
        messagesReceived: (formValue.messagesReceived)
      })
        .then(success => {/*window.location.reload(); */});
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

  addKid(kidsArray: any[], kids: FormArray) {
    const ref = firebase.database().ref(`parents/${this.authService.userId}/kids`);
    ref.set({}).then(() => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < kids.controls.length; i++ ) {
        const id = ref.push();
        const y = {
          others: kids.controls[i].get('otherHandicaps').value,
          deaf : kidsArray[i].specialNeeds.includes('deaf'),
          blind : kidsArray[i].specialNeeds.includes('blind'),
          handicapped : kidsArray[i].specialNeeds.includes('handicapped'),
          mute : kidsArray[i].specialNeeds.includes('mute'),
          autistic : kidsArray[i].specialNeeds.includes('autistic')
        };
        const x = {
          idKid: id.key,
          kidName: kids.controls[i].get('kidName').value,
          kidAge: kids.controls[i].get('kidAge').value,
          additionalInfo: kids.controls[i].get('comments').value,
          childAge: kidsArray[i].childAge,
          specialNeeds: y
        };
        ref.child(id.key).set(x);
      }
    });
  }

}
