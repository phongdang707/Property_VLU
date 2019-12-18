import * as type from "../actions/actionType";
const INITIAL_STATE = {
  payload: {}
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.UPDATE_PROPERTY:
      console.log(action);
      let actionOne;
      actionOne = "Hệ thóng có lỗi";
      if (action.payload) {
        // return [...action.payload];

        console.log("action.payload: ", action.payload);
      } else {
        return actionOne;
      }
      console.log("action");

    default:
      return state;
  }
};
