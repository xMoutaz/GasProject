// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyCLW7p0sjH5pNvgz9f9APJC9-MCftSjK4c",
    authDomain: "marriagebandits.firebaseapp.com",
    databaseURL: "https://marriagebandits.firebaseio.com",
    projectId: "marriagebandits",
    storageBucket: "marriagebandits.appspot.com",
    messagingSenderId: "873409025667",
    appId: "1:873409025667:web:e195e7a4b20384fabd2db6",
    measurementId: "G-JBSTL8LD5E"
  },
  baseUrl: "https://marriage-bandits.herokuapp.com",
  // readonly url = "http://localhost:8081/spouse";
  mapboxKey: 'pk.eyJ1IjoieG1vdXRheiIsImEiOiJjazVvM3RubzUxMXppM21ydzQ5dDI4ZnY3In0.4gqa8rQR0W0VXixe51JxbA'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
