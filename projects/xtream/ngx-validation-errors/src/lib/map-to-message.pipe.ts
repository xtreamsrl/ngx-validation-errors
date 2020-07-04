import {ChangeDetectorRef, Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {InnerMapToMessagePipe} from './inner-map-to-message.pipe';
import {MESSAGES_PIPE_FACTORY_TOKEN} from './injection-tokens';

@Pipe({
  name: 'mapToMessage',
  pure: false
})
export class MapToMessagePipe implements PipeTransform {

  pipe: PipeTransform;

  constructor(
    @Optional() cdRef: ChangeDetectorRef,
    @Optional() @Inject(MESSAGES_PIPE_FACTORY_TOKEN) private  pipeFactory: any
  ) {

    if (pipeFactory) {
      try {
        this.pipe = new pipeFactory(cdRef);
      } catch (e) {
        console.error(e);
        this.pipe = new InnerMapToMessagePipe();
      }
    } else {
      this.pipe = new InnerMapToMessagePipe();
    }
  }

  transform(value: any, args: any): any {
    return this.pipe.transform(value, ...args);
  }

}
