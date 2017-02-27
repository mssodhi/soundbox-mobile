import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  favorites: null,
  tracks: null,
  status: null
};

export const FAVORITES_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_FAVORITES:
      return Object.assign({}, INIT_STATE, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_FAVORITES_COMPLETED:
      let favorites = [];
      let tracks = [];

      action.payload.forEach(favorite => {
        SC.get('/users/' + favorite.artist_id).then(function(artist){
          favorites.push(artist);
        });
        SC.get('/tracks', {user_id: favorite.artist_id}).then(res => {
          res.forEach(track => {
            tracks.push(track);
          })
        });
      });
      return Object.assign({}, state, { favorites: favorites, tracks: tracks, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
