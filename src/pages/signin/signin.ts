import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'signin.html'
})
export class SignInPage {

  constructor(public navCtrl: NavController) {

  }

}
