import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  user: any;
  favorites: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, private store: Store<any>) {
    this.store.dispatch({ type: ACTION.LOAD_PROFILE });
  }

  ngOnInit() {
    this.store.select<any>('PROFILE_REDUCER')
      .filter(state => state.status == STATUS.COMPLETED)
      .first()
      .subscribe(state => this.user = state.user );
  }

}
