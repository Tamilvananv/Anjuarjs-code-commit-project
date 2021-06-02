// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:'http://localhost:61213/',  
  scopeUri: ['api://ca0f7c9f-1518-4d76-9a80-8edc4fb13a0d/zestorm'],
  tenantId: '675a4bf0-c210-48c8-809d-8e6a15c135c6',
  uiClienId: 'ca0f7c9f-1518-4d76-9a80-8edc4fb13a0d',
  redirectUrl: 'http://localhost:4200/mslogin',
  apiUrl: 'http://localhost:61213',
  //apiUrl: 'http://3.7.209.131:8091',
  //apiUrl: 'https://digital.immuneel.com:9444/',
  // apiUrl: 'http://13.248.221.249:8090'
  // enableDebug: false
  fileUploadSettings: { autoUpload: true, minFileSize: 0, maxFileSize: 30000000, allowedExtensions: '', autoClose: false },
  maxFileSize: 1500000,
  minFileSize: 10000,
  navigationPaneSettings: { maxWidth: '850px', minWidth: '140px', visible: true },
  contextMenuSettings: { file: ['Open', '|', 'Details', 'Download'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true },
  toolbarSettings: { items: ['Refresh', 'View', 'Details'], visible: true }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
