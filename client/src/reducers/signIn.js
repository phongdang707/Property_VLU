import validateToken from "../helpers/validationToken";
import * as type from "../actions/actionType";
let initialState = {
  user: {},
  isAuthenticated: false
};

if (validateToken().status)
  initialState = {
    user: validateToken().decoded,
    isAuthenticated: true
  };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SIGN_IN:
      console.log(action);

      return {
        user: action.payload,
        isAuthenticated: true
      };

    case "SIGN_OUT":
      return {
        user: {},
        isAuthenticated: false
      };

    default:
      break;
  }

  return state;
};

export default authReducer;
