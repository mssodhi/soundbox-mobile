import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';

import { ACTION, ArtistComponent } from '../../../shared';

@Component({
  selector: 'track-list-item',
  templateUrl: 'track-list-item.html'
})
export class TrackListItem {
  @Input() track: any;

  constructor(private navCtrl: NavController, private store: Store<any>) {}

  onSelect(track) {
    this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: track });
  }

  navigateToArtist(artist) {
    this.store.dispatch({ type: ACTION.LOAD_ARTIST, payload: artist });
    this.navCtrl.push(ArtistComponent);
  }
}
