import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

