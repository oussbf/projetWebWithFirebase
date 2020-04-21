import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitterRatingService {

  constructor() { }

  SubmitReview(formValue, starRating) {
    /*backend Script to Post a Review*/

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
}
