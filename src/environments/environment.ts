// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Pego el objeto de firebase (de la documentación de Angular Fire2) y cambiamos las configuraciones con los datos de firebase

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC8bbFn20f76gReAytaPrgPYGltEWF54LU',
    authDomain: 'firechat-4acab.firebaseapp.com',
    databaseURL: 'https://firechat-4acab.firebaseio.com',
    projectId: 'firechat-4acab',
    storageBucket: 'firechat-4acab.appspot.com',
    messagingSenderId: '75399376674'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
