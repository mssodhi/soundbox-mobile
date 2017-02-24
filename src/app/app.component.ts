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
          this.store.dispatch({ type: ACTION.LOAD_CHARTS, payload: 'all-music'});
          state.user.id? this.authenticated() : this.rootPage = SignInPage;
        });
    });
  }

  authenticated() {
    this.rootPage = TabsPage;
    SC.initialize({
      client_id: '0f7c969c815f51078c1de513f666ecdb',
      secret_token: '4d27e9b3aab697fbee797b6b1495e408',
      redirect_uri: 'http://localhost:8080/soundbox/#/'
    });
  }

}
