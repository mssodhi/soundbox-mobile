import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage implements OnInit, OnDestroy {
  charts: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, private store: Store<any>) {
    this.store.dispatch({ type: ACTION.LOAD_CHARTS, payload: 'all-music'});
  }

  ngOnInit() {
    this.subscription = this.store.select<any>('CHARTS_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => {
        console.log(state);
        this.charts = state.charts;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(track) {
    console.log(track);
  }
}
