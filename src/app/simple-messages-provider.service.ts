import {Injectable} from '@angular/core';
import {ERRORS} from './errors-mapping';

@Injectable({
  providedIn: 'root'
})
export class SimpleMessagesProviderService {

  constructor() {
  }

  public instant(key: string) {
    if (key in ERRORS) {
      return ERRORS[key];
    } else {
      return key;
    }
  }
}
