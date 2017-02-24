import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  user: any;

  constructor(public navCtrl: NavController, private store: Store<any>) {
  this.store.select<any>('PROFILE_REDUCER')
    .filter(state => state.status == STATUS.COMPLETED)
    .first()
    .subscribe(state => {
      this.user = state.user;
    });
  }

  search(input: String) {
    if(input) {
      this.store.dispatch({ type: ACTION.SEARCH, payload: input });
    }
  }

}
