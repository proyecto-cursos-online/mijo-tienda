import { Component } from '@angular/core';

declare var $: any;
declare function HOMEINIT([]): any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor() {
    setTimeout(() => {
      HOMEINIT($);
    }, 50);
  }
}
