import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingController, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage implements OnInit, OnDestroy {
  state: any;
  subscription: Subscription;
  currentGenre: any;

  constructor(public navCtrl: NavController, private store: Store<any>, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.currentGenre = 'all-music';
    this.subscription = this.store.select<any>('CHARTS_REDUCER')
      .subscribe(state => this.state = state );
  }

  getCharts(genre) {
    let loading = this.loadingCtrl.create({
      content: 'loading...'
    });
    loading.present();
    this.store.dispatch({ type: ACTION.LOAD_CHARTS, payload: genre });
    this.store.select<any>('CHARTS_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .first()
      .subscribe(() => loading.dismiss() );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
