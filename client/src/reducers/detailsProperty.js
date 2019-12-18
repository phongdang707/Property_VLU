import * as type from "../actions/actionType";
const INITIAL_STATE = {
  payload: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.DETAILS:
      return [...action.payload];
    default:
      return state;
  }
};
