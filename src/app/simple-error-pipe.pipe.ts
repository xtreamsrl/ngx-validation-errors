import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {SimpleMessagesProviderService} from './simple-messages-provider.service';

@Pipe({
  name: 'simpleError'
})
export class SimpleErrorPipe implements PipeTransform {

  constructor(private messageProvider: SimpleMessagesProviderService, cdRef: ChangeDetectorRef) {
  }

  transform(value: any, args?: any): any {
    return this.messageProvider.instant(value);
  }

}
