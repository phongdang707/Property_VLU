import * as type from "../actions/actionType";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SHOW:
      console.log("action.payload: ", action.payload);
      return [...action.payload];
    default:
      return state;
  }
};
