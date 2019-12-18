import * as Types from "../actions/actionType";

let initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ERROR:
      return action.payload;
    default:
      return { ...state };
  }
};

export default errorReducer;
