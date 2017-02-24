import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  artist: null,
  tracks: null,
  status: null
};

export const ARTIST_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_ARTIST:
      let tracks = [];

      SC.get('/tracks', {user_id: action.payload.id}).then(res => {
        res.forEach(track => {
          tracks.push(track);
        })
      });
      return Object.assign({}, state, { artist: action.payload, tracks: tracks, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
