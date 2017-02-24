import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnDestroy {
  subscription: Subscription;
  results: any;

  constructor(public navCtrl: NavController, private store: Store<any>) {
    this.subscription = this.store.select<any>('SEARCH_REDUCER')
      .filter(state => state.status == STATUS.COMPLETED)
      .subscribe(state => this.results = state.results );
  }

  search(input: String) {
    if(input) {
      this.store.dispatch({ type: ACTION.LOAD_SEARCH, payload: input });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
