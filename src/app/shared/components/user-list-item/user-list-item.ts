import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';

import { ACTION, ArtistComponent } from '../../../shared';

@Component({
  selector: 'user-list-item',
  templateUrl: 'user-list-item.html'
})
export class UserListItem {
  @Input() user: any;

  constructor(public navCtrl: NavController, private store: Store<any>) {}

  onSelect(user) {
    this.store.dispatch({ type: ACTION.LOAD_ARTIST, payload: user });
    this.navCtrl.push(ArtistComponent);
  }

}
