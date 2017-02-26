import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { STATUS } from '../../constants';

@Component({
  selector: 'artist-component',
  templateUrl: 'artist.html'
})
export class ArtistComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  state: any;

  constructor(private navCtrl: NavController, private params: NavParams, private store: Store<any>) {}

  ngOnInit() {
    this.subscription = this.store.select<any>('ARTIST_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.state = state );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
