import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CryptoEncrypter';

  secretKey!: string;
  inputVector!: string;
  stringToEncrypt!: string;
  encryptedStringAfterEncryption: string=""
  stringToDecrypt!: string
  encryptedStringAfterDecryption: string=""
  encrypt() {
    const encrypted = CryptoJS.AES.encrypt(this.stringToEncrypt, this.secretKey, {
      iv: CryptoJS.enc.Hex.parse(this.inputVector),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    this.encryptedStringAfterEncryption = encrypted.toString()
  }

  decrypt(){
    const decrypted = CryptoJS.AES.decrypt(this.stringToDecrypt, this.secretKey,{
      iv: CryptoJS.enc.Hex.parse(this.inputVector),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })
    this.encryptedStringAfterDecryption = decrypted.toString(CryptoJS.enc.Utf8)
  }

  getString(
    e: Event,
    stringType: 'stringToEncrypt' | 'inputVector' | 'secretKey' | 'stringToDecrypt'
  ) {
    switch (stringType) {
      case 'stringToEncrypt':
        this.stringToEncrypt = (e.target as HTMLTextAreaElement).value;
        break;
      case 'inputVector':
        this.inputVector = (e.target as HTMLInputElement).value;
        break;
      case 'secretKey':
        this.secretKey = (e.target as HTMLInputElement).value;
        break;
        case 'stringToDecrypt': this.stringToDecrypt = (e.target as HTMLTextAreaElement).value;
        break;
    }
  }
}
