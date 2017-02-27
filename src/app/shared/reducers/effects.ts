import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap'

import { ACTION, STATUS } from '../../shared';
import { FavoritesService, ProfileService, SCService } from '../services'

@Injectable()
export class Effects {

  @Effect() loadProfile$ = this.actions$
    .ofType(ACTION.LOAD_PROFILE)
    .switchMap(() =>
      this.profileService.getProfile()
        .map(res => ({ type: ACTION.LOAD_PROFILE_COMPLETED, payload: res }))
    );

  @Effect() loadFavorites$ = this.actions$
    .ofType(ACTION.LOAD_FAVORITES)
    .switchMap(action =>
    this.favoritesService.getFavorites(action.payload)
      .map(res => ({ type: ACTION.LOAD_FAVORITES_COMPLETED, payload: res }))
    );

  @Effect() loadPlaylists$ = this.actions$
    .ofType(ACTION.LOAD_PLAYLISTS)
    .switchMap(action =>
    this.favoritesService.getPlaylists(action.payload)
      .map(res => ({ type: ACTION.LOAD_PLAYLISTS_COMPLETED, payload: res }))
    );

  @Effect() loadPlaylist$ = this.actions$
    .ofType(ACTION.LOAD_PLAYLIST)
    .switchMap(action =>
    this.favoritesService.loadPlaylist(action.payload)
      .map(res => ({ type: ACTION.LOAD_PLAYLIST_COMPLETED, payload: res }))
    );

  @Effect() loadArtist$ = this.actions$
    .ofType(ACTION.LOAD_ARTIST)
    .switchMap(action =>
      this.favoritesService.loadArtist(action.payload)
        .map(res => ({ type: ACTION.LOAD_ARTIST_COMPLETED, payload: res }))
    );

  @Effect() loadCharts$ = this.actions$
    .ofType(ACTION.LOAD_CHARTS)
    .switchMap(action =>
    this.favoritesService.getCharts(action.payload)
      .map(res => ({ type: ACTION.LOAD_CHARTS_COMPLETED, payload: res }))
    );

  @Effect() loadTrack$ = this.actions$
    .ofType(ACTION.LOAD_TRACK)
    .switchMap(action =>
      this.scService.getPlayer(action.payload)
        .map(res => {
          this.store.select<any>('PLAYER_REDUCER')
            .filter(state => state.status === STATUS.COMPLETED)
            .subscribe(state => {
              state.player.on('finish', () => {
                this.store.dispatch({ type: ACTION.UPDATE_STATE, payload: {isPlaying: false} });
                if(state.tracks && state.tracks.length > 0) {
                  let currentIndex = state.tracks.indexOf(state.track);
                  if(currentIndex + 1 < state.tracks.length) {
                    this.store.dispatch({ type: ACTION.LOAD_TRACK, payload: state.tracks[currentIndex + 1]});
                  }
                }
              });
            });
          return ({ type: ACTION.LOAD_TRACK_COMPLETED, payload: { track: action.payload, player: res } });
        })
    );

  @Effect() loadSearch$ = this.actions$
    .ofType(ACTION.LOAD_SEARCH)
    .switchMap(action =>
      this.scService.search(action.payload)
        .map(res => ({ type: ACTION.LOAD_SEARCH_COMPLETED, payload: res }))
    );

  @Effect() verifyUser$ = this.actions$
    .ofType(ACTION.VERIFY_USER)
    .switchMap(action =>
      this.profileService.verifyUser(action.payload.fb_id, action.payload.name)
        .map(res => ({ type: ACTION.VERIFY_USER_COMPLETED, payload: res }))
    );

  @Effect() loadGenres$ = this.actions$
    .ofType(ACTION.LOAD_GENRES)
    .switchMap(action =>
      this.favoritesService.getGenres()
        .map(res => ({ type: ACTION.LOAD_GENRES_COMPLETED, payload: res }))
    );

  constructor (private actions$: Actions,
               private profileService: ProfileService,
               private favoritesService: FavoritesService,
               private scService: SCService,
               private store: Store<any>
  ) { }

}
