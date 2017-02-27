import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  playlists: null,
  currentPlaylist: null,
  status: null
};

export const PLAYLIST_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_PLAYLISTS:
      return Object.assign({}, INIT_STATE, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_PLAYLISTS_COMPLETED:
      return Object.assign({}, state, { playlists: action.payload, status: STATUS.COMPLETED });

    case ACTION.LOAD_PLAYLIST:
      return Object.assign({}, state, { currentPlaylist: action.payload, status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_PLAYLIST_COMPLETED:
      state.currentPlaylist.songs = action.payload;
      return Object.assign({}, state, { currentPlaylist: state.currentPlaylist, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
