import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

function minCheckSelected(size: number) {
  return (control: AbstractControl) => {
    const values = control.value as (boolean | undefined)[];
    const selected = values.filter(v => !!v).length;
    if (selected < size) {
      return {checkBoxes: true};
    }
    return null;
  };
}

@Component({
  selector: 'app-lazy-form',
  templateUrl: './lazy-form.component.html',
  styleUrls: ['./lazy-form.component.css']
})
export class LazyFormComponent implements OnInit {

  heroForm: FormGroup;

  boxesInfo = [
    'a',
    'b',
    'c',
    'd'
  ];

  constructor(private translateService: TranslateService) {
    this.heroForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      surname: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
      checkBoxes: new FormArray(this.boxesInfo.map(a => new FormControl()), [minCheckSelected(1)])
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
