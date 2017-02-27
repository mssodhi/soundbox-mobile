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
      return Object.assign({}, state, { artist: action.payload, status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_ARTIST_COMPLETED:
      return Object.assign({}, state, { tracks: action.payload, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
