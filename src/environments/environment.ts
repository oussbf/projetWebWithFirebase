// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDI4ezA7V-2g2NR-6CP9V__-rWSprKQSNM',
    authDomain: 'webprojectbackend.firebaseapp.com',
    databaseURL: 'https://webprojectbackend.firebaseio.com',
    projectId: 'webprojectbackend',
    storageBucket: 'webprojectbackend.appspot.com',
    messagingSenderId: '584788442634',
    appId: '1:584788442634:web:3f42b5e4e6b6fe5a5a29f3',
    measurementId: 'G-6HST2JSD7N'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
