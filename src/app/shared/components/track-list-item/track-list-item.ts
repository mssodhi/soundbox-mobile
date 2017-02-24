import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';

import { ACTION, STATUS } from "../../constants";

@Component({
  selector: 'track-list-item',
  templateUrl: 'track-list-item.html'
})
export class TrackListItem {
  @Input() track: any;

  constructor(private store: Store<any>) {}

  onSelect(track) {
    this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: track });
    this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .first()
      .subscribe(state => {
        this.store.dispatch({ type: ACTION.PLAY });
        state.player.on('finish', () => {
          this.store.dispatch({ type: ACTION.UPDATE_STATE, payload: {isPlaying: false} });
          // getNext and play song
          // this.store.dispatch({ type: ACTION.NEXT });
        });
      });
  }

}
