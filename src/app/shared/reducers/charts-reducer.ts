import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  charts: null,
  genres: null,
  status: null
};

export const CHARTS_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_CHARTS:
      return Object.assign({}, state, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_CHARTS_COMPLETED:
      return Object.assign({}, state, { charts: action.payload.collection, status: STATUS.COMPLETED });

    case ACTION.LOAD_GENRES:
      return Object.assign({}, state, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_GENRES_COMPLETED:
      return Object.assign({}, state, { genres: action.payload, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
