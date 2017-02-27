import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { STATUS, FavoritesListComponent, PlaylistListComponent } from '../../app/shared';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  favorites: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, private store: Store<any>) {}

  ngOnInit() {
    this.subscription = this.store.select<any>('FAVORITES_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.favorites = state );
  }

  navigateToFavorites() {
    this.navCtrl.push(FavoritesListComponent);
  }

  navigateToPlaylists() {
    this.navCtrl.push(PlaylistListComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
