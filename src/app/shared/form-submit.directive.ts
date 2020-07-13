import {Directive, HostListener, Input} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Directive({
  selector: '[appFormSubmit]'
})
export class FormSubmitDirective {

  @Input()
  private appFormSubmit: FormGroup;

  constructor() {
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    this.markControlsDirty(this.appFormSubmit);
  }

  private markControlsDirty(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.markControlsDirty(abstractControl);
      } else {
        abstractControl.markAsDirty();
        abstractControl.markAsTouched();
        abstractControl.updateValueAndValidity();
      }
    });
  }
}
