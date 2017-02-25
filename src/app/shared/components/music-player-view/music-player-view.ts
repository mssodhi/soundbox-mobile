import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from "../../constants";

@Component({
  selector: 'music-player-view',
  templateUrl: 'music-player-view.html'
})
export class MusicPlayerView implements OnInit, OnDestroy {
  state: any;
  subscription: Subscription;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.subscription = this.store.select<any>('PLAYER_REDUCER')
      .filter(state => state.status === STATUS.COMPLETED)
      .subscribe(state => this.state = state );
  }

  togglePlay() {
    if(this.state.isPlaying) {
      this.store.dispatch({ type: ACTION.PAUSE });
    } else {
      this.store.dispatch({ type: ACTION.PLAY });
    }
  }

  skipForward() {
    console.log('next');
  }

  skipBackward() {
    console.log('back');
  }

  milliToTime(milli: number) {
    let minutes = Math.floor(milli / 60000);
    let seconds = parseInt(((milli % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
