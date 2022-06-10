import { counterAction } from "../actions/counterActions";

export interface counterState {
  changes: number;
  count: number;
  previous: number;
}

export const INITIAL_STATE: counterState = {
  changes: 0,
  count: 0,
  previous: 0,
};

export const counterReducer = (
  state: counterState,
  action: counterAction
): counterState => {
  switch (action.type) {
    case "increaseBy":
      return {
        ...state,
        count: state.count + action.payload.value,
        previous: state.count,
        changes: state.changes + 1,
      };
    case "decrementBy":
      return {
        ...state,
        count: state.count - action.payload.value,
        previous: state.count,
        changes: state.changes + 1,
      };
    case "reset":
      return {
        ...state,
        count: 0,
        previous: 0,
        changes: 0,
      };
    default:
      return state;
  }
};
