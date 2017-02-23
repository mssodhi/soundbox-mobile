import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
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
      .subscribe(state => {
        this.user = state.user;
        this.getFavorites();
      });
  }

  getFavorites() {
    this.store.dispatch({ type: ACTION.LOAD_FAVORITES, payload: this.user.id });
    this.subscription = this.store.select<any>('FAVORITES_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.favorites = state);
  }

  onSelect(track) {
    this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: track });
    this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .first()
      .subscribe(state => this.store.dispatch({ type: ACTION.PLAY }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
