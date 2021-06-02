export const environment = {
  production: true,

  //Immuneel UAT
  // baseUrl:'https://digitaluat.immuneel.com:8443/',  
  // scopeUri: ['api://41ecf3e9-7a3c-46d0-bb05-7c503568c904/immuneel'],
  // tenantId: '3825557b-ec17-422f-94ca-14ee9511ef61',
  // uiClienId: '41ecf3e9-7a3c-46d0-bb05-7c503568c904',
  // redirectUrl: 'https://digitaluat.immuneel.com/mslogin',
  // apiUrl: 'https://digitaluat.immuneel.com:8443',//UAT2 */

  // apiUrl: 'http://65.1.79.242:8091',  //ELN Symphonytech
  //  apiUrl: 'http://13.248.221.249:8090', //UAT
  //apiUrl: 'https://digital.immuneel.com:8443',  //Production
  //apiUrl: 'http://3.7.209.131:8091',  //staging1
  // apiUrl: 'http://52.66.236.179:8091',  //staging2


  // SymphonyTech Staging
   apiUrl: 'https://staging.symphonybx.com:8091',
  baseUrl: 'https://staging.symphonybx.com:8091/',
  scopeUri: ['api://ca0f7c9f-1518-4d76-9a80-8edc4fb13a0d/zestorm'],
  tenantId: '675a4bf0-c210-48c8-809d-8e6a15c135c6',
  uiClienId: 'ca0f7c9f-1518-4d76-9a80-8edc4fb13a0d',
  redirectUrl: 'https://staging.symphonybx.com/mslogin', 


//Immuneel Production
/*baseUrl:'https://digital.immuneel.com:8443/',  
scopeUri: ['api://41ecf3e9-7a3c-46d0-bb05-7c503568c904/immuneel'],
tenantId: '3825557b-ec17-422f-94ca-14ee9511ef61',
uiClienId: '41ecf3e9-7a3c-46d0-bb05-7c503568c904',
redirectUrl: 'https://digital.immuneel.com/mslogin',
apiUrl: 'https://digital.immuneel.com:8443',*/


 // Acuimmune 
  /* apiUrl: 'https://acuimmune.symphonybx.com:8091',
  baseUrl: 'https://acuimmune.symphonybx.com:8091/',
  scopeUri: ['api://18ccfcea-6c2b-46de-809d-c3681ae25479/acuimmune'],
  tenantId: 'eb530277-8ed7-4d0d-9f1f-28ff10228ab3',
  uiClienId: '18ccfcea-6c2b-46de-809d-c3681ae25479',
  redirectUrl: 'https://acuimmune.symphonybx.com/mslogin', */



  fileUploadSettings: { autoUpload: true, minFileSize: 0, maxFileSize: 30000000, allowedExtensions: '', autoClose: false },
  maxFileSize: 1500000,
  minFileSize: 10000,
  navigationPaneSettings: { maxWidth: '850px', minWidth: '140px', visible: true },
  contextMenuSettings: { file: ['Open', '|', 'Details', 'Download'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true },
  toolbarSettings: { items: ['Refresh', 'View', 'Details'], visible: true }
};
