import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  user: any;

  constructor(public navCtrl: NavController, private store: Store<any>, private storage: Storage) {}

  ngOnInit() {
    this.store.select<any>('PROFILE_REDUCER')
      .filter(state => state.status == STATUS.COMPLETED)
      .first()
      .subscribe(state => this.user = state.user );
  }

  logout() {
    this.storage.remove('profile').then(() => {
      this.store.dispatch({ type: ACTION.LOAD_PROFILE });
    })
  }

}
