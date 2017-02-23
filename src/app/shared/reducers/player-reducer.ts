import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  player: null,
  track: null,
  isPlaying: null,
  status: null
};

export const PLAYER_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_TRACK:
      return Object.assign({}, INIT_STATE, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_TRACK_COMPLETED:
      return Object.assign({}, state, { track: action.payload.track, player: action.payload.player, status: STATUS.COMPLETED });

    case ACTION.PLAY:
      state.player.play();
      state.player.on('finish', () => {
        state.isPlaying = false;
      });

      return Object.assign({}, state, { isPlaying: true, status: STATUS.COMPLETED });

    case ACTION.PAUSE:
      state.player.pause();
      return Object.assign({}, state, { isPlaying: false, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
