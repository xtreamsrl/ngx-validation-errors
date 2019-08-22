import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-lazy-form',
  templateUrl: './lazy-form.component.html',
  styleUrls: ['./lazy-form.component.css']
})
export class LazyFormComponent implements OnInit {

  heroForm: FormGroup;

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
}
