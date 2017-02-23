import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from "../../constants";

@Component({
  selector: 'music-player',
  templateUrl: 'music-player.html'
})
export class MusicPlayer implements OnInit, OnDestroy {
  user: any;
  favorites: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, private store: Store<any>) {
    this.store.dispatch({ type: ACTION.LOAD_PROFILE });
  }

  ngOnInit() {
    SC.initialize({
      client_id: '0f7c969c815f51078c1de513f666ecdb',
      secret_token: '4d27e9b3aab697fbee797b6b1495e408',
      redirect_uri: 'http://localhost:8080/soundbox/#/'
    });

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
    console.log(track);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
