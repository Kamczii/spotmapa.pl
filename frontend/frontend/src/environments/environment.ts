// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0_endpoint: 'https://k4mczi.eu.auth0.com',
  clientID: 'bGLl7SxWSogJf5ogx2alxs0KLQfzLW0q',
  domain: 'k4mczii.eu.auth0.com',
  responseType: 'token id_token',
  audience: 'https://k4mczi/api',
  redirectUri: 'http://localhost:4200/callback',
  requestedScopes: 'openid , profile',
  api_endpoint: 'http://localhost:8080/spotmap-api',
  assets: '../../../assets/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
