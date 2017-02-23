import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';

import { ACTION, STATUS } from '../../app/shared';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html'
})
export class ChartsPage implements OnInit {
  charts: any;

  constructor(public navCtrl: NavController, private store: Store<any>) {}

  ngOnInit() {
    this.store.select<any>('CHARTS_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .first()
      .subscribe(state => {
        this.charts = state.charts;
      });
  }

  onSelect(track) {
    this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: track });

    this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .first()
      .subscribe(() => this.store.dispatch({ type: ACTION.PLAY }));
  }
}
