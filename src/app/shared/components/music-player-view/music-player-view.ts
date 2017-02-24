import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from "../../constants";

@Component({
  selector: 'music-player-view',
  templateUrl: 'music-player-view.html'
})
export class MusicPlayerView implements OnInit {
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

  navigateToPlayer() {
    console.log('nav');
  }

}
