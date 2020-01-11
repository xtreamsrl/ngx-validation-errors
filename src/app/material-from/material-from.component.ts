import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ValidationContextComponent} from '@xtream/ngx-validation-errors';

@Component({
  selector: 'app-main-from',
  templateUrl: './material-from.component.html',
  styleUrls: ['./material-from.component.css']
})
export class MaterialFromComponent implements OnInit {

  heroForm: FormGroup;
  @ViewChild('firstForm', {read: ValidationContextComponent, static: true}) validationContext: ValidationContextComponent;

  constructor(private translateService: TranslateService) {
    this.heroForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      surname: new FormControl(null, [Validators.required, Validators.maxLength(1000)])
    });
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  clearForm() {
    console.debug('this.validationContext', this.validationContext);
    this.validationContext.clear();

  }
}
