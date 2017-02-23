import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap'

import { ACTION } from '../../shared';
import { FavoritesService, ProfileService } from '../services'

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

  @Effect() loadCharts$ = this.actions$
    .ofType(ACTION.LOAD_CHARTS)
    .switchMap(action =>
    this.favoritesService.getCharts(action.payload)
      .map(res => ({ type: ACTION.LOAD_CHARTS_COMPLETED, payload: res }))
    );

  constructor (private actions$: Actions,
               private profileService: ProfileService,
               private favoritesService: FavoritesService
  ) { }

}
