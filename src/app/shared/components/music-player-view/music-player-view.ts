import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS } from '../../constants';

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

  canSkipForward() {
    if(this.state.tracks && this.state.tracks.length > 0) {
      let currentIndex = this.state.tracks.indexOf(this.state.track);
      return currentIndex + 1 < this.state.tracks.length;
    } else {
      return false;
    }
  }

  canSkipBackward() {
    if(this.state.tracks && this.state.tracks.length > 0) {
      let currentIndex = this.state.tracks.indexOf(this.state.track);
      return currentIndex - 1 >= 0;
    } else {
      return false;
    }
  }

  skipForward() {
    if(this.canSkipForward()) {
      let currentIndex = this.state.tracks.indexOf(this.state.track);
      if(currentIndex + 1 < this.state.tracks.length) {
        this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: this.state.tracks[currentIndex + 1]});
      }
    }
  }

  skipBackward() {
    if(this.canSkipBackward()) {
      let currentIndex = this.state.tracks.indexOf(this.state.track);
      if(currentIndex - 1 >= 0) {
        this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: this.state.tracks[currentIndex - 1]});
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
