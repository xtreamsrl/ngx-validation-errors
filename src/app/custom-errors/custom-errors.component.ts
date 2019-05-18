import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-errors',
  templateUrl: './custom-errors.component.html',
  styleUrls: ['./custom-errors.component.scss']
})
export class CustomErrorsComponent implements OnInit {

  @Input() public messages: string[] = [];
  @Input() public params: {[key: string]: any} = {};
  @Input() @HostBinding('class.is-inner') public innerValidationError: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
