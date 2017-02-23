import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  user: null,
  status: null
};

export const PROFILE_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_PROFILE:
      return Object.assign({}, INIT_STATE, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_PROFILE_COMPLETED:
      return Object.assign({}, state, { user: action.payload, status: STATUS.COMPLETED });

    default:
      return state;
  }
};