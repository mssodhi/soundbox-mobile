import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  favorites: null,
  tracks: null,
  status: null
};

export const FAVORITES_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  SC.initialize({
    client_id: '0f7c969c815f51078c1de513f666ecdb',
    secret_token: '4d27e9b3aab697fbee797b6b1495e408',
    redirect_uri: 'http://localhost:8080/soundbox/#/'
  });

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

    case ACTION.LOAD_TRACKS_FAVORITES:
      return Object.assign({}, state);

    case ACTION.LOAD_TRACKS_FAVORITES_COMPLETED:
      return Object.assign({}, state, { status: STATUS.COMPLETED });

    default:
      return state;
  }
};
