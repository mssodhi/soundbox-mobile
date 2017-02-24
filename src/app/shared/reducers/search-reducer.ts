import { ActionReducer, Action } from '@ngrx/store';

import { ACTION, STATUS } from '../constants';

const INIT_STATE = {
  results: null,
  status: null
};

export const SEARCH_REDUCER: ActionReducer<any> = (state = INIT_STATE, action: Action) => {
  switch (action.type) {

    case ACTION.LOAD_SEARCH:
      return Object.assign({}, INIT_STATE, { status: STATUS.IN_PROGRESS });

    case ACTION.LOAD_SEARCH_COMPLETED:
      return Object.assign({}, state, { results: action.payload, status: STATUS.COMPLETED });

    default:
      return state;
  }
};
