import * as type from "../actions/actionType";
const INITIAL_STATE = {
  search: "",
  payload: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SEARCH:
      console.log("INITIAL_STATE: ", INITIAL_STATE);
      console.log("state: ", state);
      console.log("sad", action);
      return {
        search: action.search,
        payload: [...action.payload]
      };
    default:
      return state;
  }
};
