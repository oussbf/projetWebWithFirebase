import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  submitRequest(formValue) {

    /*backend Script for Request submission*/

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
