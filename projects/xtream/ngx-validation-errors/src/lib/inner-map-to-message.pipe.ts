import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Injectable()
@Pipe({
  name: 'innerMapToMessage',
  pure: false
})
export class InnerMapToMessagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
