import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor() { }

  encryptText(value: string) {
    var rsa = new JSEncrypt({});
    let key = "-----BEGIN PUBLIC KEY-----\
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFNXiVzcsvsOcwqcIECE0fNPdt\
    UOGq6GjljUX/QvPHBG/FUTpYLMUozTdi4x0R3jxr5oE/dG4K5T3zyEa2YnimzN9k\
    mNpfWgm3doKbjUnrjO0hnFgdx00Hy6Sn3qvM7L604fkQ1ZVKkaobdYKYpY59gSfY\
    5IU29Y87wobU+P+O6QIDAQAB\
    -----END PUBLIC KEY-----";
    rsa.setPublicKey(key);
    var encrypted = rsa.encrypt(value);
    console.log(encrypted);
    return encrypted.toString();
  }

  encryptRSA(value: string) {
    let rsa = forge.pki.publicKeyFromPem("-----BEGIN PUBLIC KEY-----\
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkskeHcz6zTvnXKGHbCkfeEnKF\
    38j1hEgWw9UAZlg5a7m/1AaHkqkvKUOfoX+zSYH4CJr/MEVmrEa2ucPjKljXK14M\
    74NzSwYuPxaikpfwxe7qvn1/0TIqahVHEiSmqieLIl+gHIyAc32e/wUyjhGFjbwL\
    eJ/hBDTkt6O/QajWKwIDAQAB\
    -----END PUBLIC KEY-----");
    return rsa.encrypt(value);
  }

  //The set method is use for encrypt the value.
  set(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}