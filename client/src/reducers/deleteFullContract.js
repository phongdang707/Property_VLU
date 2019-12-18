import * as type from "../actions/actionType";
const INITIAL_STATE = {};

export default (state = [], action) => {
  switch (action.type) {
    case type.DELETE_FULLCONTRACT:
      console.log("action: ", action);
      // let commentId = action.data;
      // return [...action.payload];
      state = [...action.payload];
      console.log("state: ", state);
      return [...state];
    // console.log();

    default:
      return state;
  }
};
