import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { ACTION, STATUS, MusicPlayerComponent } from '../../../shared';

@Component({
  selector: 'music-player',
  templateUrl: 'music-player.html'
})
export class MusicPlayer implements OnInit {
  state: any;
  subscription: Subscription;

  constructor(private navCtrl: NavController, private store: Store<any>) {}

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
    this.navCtrl.push(MusicPlayerComponent);
  }

}
