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

  constructor(public navCtrl: NavController, private storage: Storage, private store: Store<any>) {}

  onFacebookSelect() {
    this.store.dispatch({ type: ACTION.FACEBOOK_LOGIN });
  }

  onDemoSelect() {
    this.storage.ready().then(() => {
      let user = {
        id: '1',
        fb_id: '1209',
        name: 'Demo',
        pic_url: ''
      };
      this.storage.set('profile', user);
      setTimeout(() => {
        this.store.dispatch({ type: ACTION.LOAD_PROFILE });
      }, 250);
    });
  }

}
