import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {first, last} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitterAccountService {

  constructor(private authService: AuthService) { }

  savePI(formValue) {
    firebase.database().ref(`sitters/${this.authService.userId}`).update({firstName: formValue.firstName,
      lastName: formValue.lastName, email: formValue.email, phoneNumber: formValue.phoneNumber, jobEducation: formValue.jobStatus})
      .then(() => {window.location.reload(); });
  }

  saveNP(formValue) {
    const currentUser = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(currentUser.email, formValue.oldPassword);
    currentUser.reauthenticateWithCredential(credentials).then(success => {currentUser.updatePassword(formValue.newPassword)
      .then( () => {
          window.location.reload();
        }
      );
    });
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

  saveJI(formValue, childAge, certificates) {
    firebase.database().ref(`sitters/${this.authService.userId}`).update({
      displacement: formValue.displacement,
      numberOfChildrenHandling: formValue.numberOfChildrenHandling,
      experienceYears: formValue.experienceYears,
      childAge: {
        infant: childAge.includes('infant'),
        toddler: childAge.includes('toddler'),
        preschooler: childAge.includes('preschooler'),
        schooler: childAge.includes('schooler')
      },
      certificates: {
        CPR: certificates.includes('CPR'),
        drivingLicence: certificates.includes('drivingLicence'),
        firstAid: certificates.includes('firstAid'),
        fitnessEducation: certificates.includes('fitnessEducation'),
        nutrition: certificates.includes('nutrition'),
        specialNeedCare: certificates.includes('specialNeedCare'),
        waterSafety: certificates.includes('waterSafety'),
      }
    }).then(() => {window.location.reload(); });
  }

  saveAM(formValue) {
    firebase.database().ref(`sitters/${this.authService.userId}`).update({aboutMe: formValue.aboutMeText}).then(success => {
      window.location.reload();
    });
  }

  saveAV(formValue) {
    if (formValue.available) {
      firebase.database().ref(`sitters/${this.authService.userId}`).update({
        availability: formValue.available,
        availabilityDate: formValue.availabilityDate,
        availabilityDuration: formValue.duration,
        availablityOpenForRegularJob: formValue.openJob,
        availabilityAdditionalInfo: formValue.availabilityAdditionalInfo
      }).then(() => {window.location.reload(); });
    } else {
      firebase.database().ref(`sitters/${this.authService.userId}`).update({
        availability: formValue.available,
        availabilityDate: '',
        availabilityDuration: '',
        availablityOpenForRegularJob: false,
        availabilityAdditionalInfo: ''
      }).then(() => {window.location.reload(); });
    }
  }

  updateNotifications(formValue) {
    if (formValue.emailSub.length) {
      firebase.database().ref(`sitters/${this.authService.userId}/notifications`).update({
        emailSub: formValue.emailSub,
        jobRequest: formValue.jobRequest,
        reviewsReceived: formValue.reviewsReceived
      })
        .then(() => {/*window.location.reload(); */});
    } else {
      firebase.database().ref(`sitters/${this.authService.userId}/notifications`).update({emailSub: ''})
        .then(() => {window.location.reload(); });
    }
  }

  acceptClick(idJob, firstName, lastName, phoneNbr, idParent, imageUrl) {
    firebase.database().ref(`sitters/${this.authService.userId}/jobs`).child(idJob).update({jobStatus: true});
    const x = firebase.database().ref(`parents/${idParent}`).child('messages').push();
    x.set({
      idMessage: x.key,
      idSender: this.authService.userId,
      firstNameSender: firstName,
      lastNameSender: lastName,
      status: 'accepted',
      phoneNumber: phoneNbr,
      imageURL: imageUrl
        }).then(() => {window.location.reload(); });

  }

  rejectClick(idJob, firstName, lastName, idParent, imageUrl) {
    firebase.database().ref(`sitters/${this.authService.userId}/jobs`).child(idJob).update({jobStatus: false});
    const x = firebase.database().ref(`parents/${idParent}`).child('messages').push();
    x.set({
      idMessage: x.key,
      idSender: this.authService.userId,
      firstNameSender: firstName,
      lastNameSender: lastName,
      status: 'declined',
      imageURL: imageUrl
    }).then(() => {window.location.reload(); });
  }

  deleteJob(idJob) {
    firebase.database().ref(`sitters/${this.authService.userId}/jobs`).child(idJob).remove()
      .then(success => {console.log('message Deleted'); });
  }
}
