import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { STATUS } from '../../constants';

@Component({
  selector: 'favorites-list',
  templateUrl: 'favorites-list.html'
})
export class FavoritesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  state: any;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.subscription = this.store.select<any>('FAVORITES_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.state = state );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
