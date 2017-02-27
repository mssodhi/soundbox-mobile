import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS, PlaylistComponent } from '../../../shared';

@Component({
  selector: 'playlist-list',
  templateUrl: 'playlist-list.html'
})
export class PlaylistListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  state: any;
  playerState: any;

  constructor(public navCtrl: NavController, private store: Store<any>) {
    this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .first()
      .subscribe(state => this.playerState = state );
  }

  ngOnInit() {
    this.subscription = this.store.select<any>('PLAYLIST_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.state = state );
  }

  onSelect(playlist) {
    this.store.dispatch({ type: ACTION.LOAD_PLAYLIST, payload: Object.assign({}, playlist) });
    this.navCtrl.push(PlaylistComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
