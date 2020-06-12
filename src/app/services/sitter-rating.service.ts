import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {now} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SitterRatingService {

  constructor(private authService: AuthService) { }

  SubmitReview(formValue, starRating, sitterId) {
    let x;
    firebase.database().ref(`parents/${this.authService.userId}`).once('value', parent => {
      x = parent.exportVal().firstName;
      firebase.database().ref(`sitters/${sitterId}`).child('reviews').push().set({
        firstNameRev: x,
        idRev: this.authService.userId,
        review: starRating,
        reviewDate: new Date(now()).toLocaleDateString(),
        reviewText: formValue.reviewText,
        imageURL: parent.exportVal().imageURL
      }).then(()  => {
        firebase.database().ref(`sitters/${sitterId}`).once('value', sitter => {
          if (sitter.exportVal().avgRate) {
            const y = ((+sitter.exportVal().avgRate * (sitter.child('reviews').numChildren() - 1)) + starRating)
              / (sitter.child('reviews').numChildren());
            firebase.database().ref((`sitters/${sitterId}`)).update({
              avgRate: y
            });
          } else {
            firebase.database().ref((`sitters/${sitterId}`)).update({
              avgRate: starRating
            });
          }

        });
      });
    }).then(() => {
      window.location.reload();
    });
  }
}
