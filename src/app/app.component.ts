import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/signin/signin';
import { ACTION, STATUS } from './shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = null;

  constructor(private platform: Platform, private store: Store<any>) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.store.dispatch({ type: ACTION.LOAD_PROFILE });
      this.store.select<any>('PROFILE_REDUCER')
        .filter(state => state.status == STATUS.COMPLETED)
        .first()
        .subscribe(state => {
          state.user.id? this.rootPage = TabsPage : this.rootPage = SignInPage;
        });
    });
  }
}
