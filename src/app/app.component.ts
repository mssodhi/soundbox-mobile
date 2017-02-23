import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      SC.initialize({
        client_id: '0f7c969c815f51078c1de513f666ecdb',
        secret_token: '4d27e9b3aab697fbee797b6b1495e408',
        redirect_uri: 'http://localhost:8080/soundbox/#/'
      });
      Splashscreen.hide();
      // test
      SC.get('/tracks', {user_id: 36960179, limit: 500}).then(res => console.log(res));
    });
  }
}
