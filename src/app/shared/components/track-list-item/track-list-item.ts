import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';

import { ACTION, STATUS, ArtistComponent } from "../../../shared";

@Component({
  selector: 'track-list-item',
  templateUrl: 'track-list-item.html'
})
export class TrackListItem {
  @Input() track: any;

  constructor(private navCtrl: NavController, private store: Store<any>) {}

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

  navigateToArtist(artist) {
    this.store.dispatch({ type: ACTION.LOAD_ARTIST, payload: artist });
    this.navCtrl.push(ArtistComponent);
  }
}
