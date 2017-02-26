import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ACTION, STATUS } from '../../../shared';

@Component({
  selector: 'track-list',
  templateUrl: 'track-list.html'
})
export class TrackList {
  @Input() tracks: any[] = [];
  state: any;
  subscription: Subscription;
  constructor(private store: Store<any>) {
    this.subscription = this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.state = state );
  }

  shuffle() {
    let tracks = this.tracks.slice(0, 50).map(track => track).sort((a, b) => Math.random() - Math.random());
    this.store.dispatch({ type: ACTION.SHUFFLE, payload: tracks });
    this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: tracks[0] });
  }
}
