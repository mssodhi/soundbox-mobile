import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from "../../constants";

@Component({
  selector: 'music-player',
  templateUrl: 'music-player.html'
})
export class MusicPlayer implements OnInit {
  user: any;
  state: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, private store: Store<any>) {}

  ngOnInit() {
    this.store.select<any>('PROFILE_REDUCER')
      .filter(state => state.status == STATUS.COMPLETED)
      .first()
      .subscribe(state => this.user = state.user );

    this.subscription = this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => { this.state = state; console.log(this.state);} );
  }

  togglePlay() {
    if(this.state.isPlaying) {
      this.store.dispatch({ type: ACTION.PAUSE });
    } else {
      this.store.dispatch({ type: ACTION.PLAY });
    }
  }

}
