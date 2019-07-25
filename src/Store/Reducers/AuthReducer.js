import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_FAIL:
      let errorMessage = null;
      switch (action.error.message) {
        case "INVALID_EMAIL":
          errorMessage = "please check the email..!";
          break;
        case "EMAIL_EXISTS":
          errorMessage = "email already exista try signing in";
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage = " please check the email..!";
          break;
        case "INVALID_PASSWORD":
          errorMessage = "invalid password";
          break;
        default:
          errorMessage = "some error occured, please contact Mr.Rahit";
      }
      return {
        ...state,
        loading: false,
        error: errorMessage
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };

    default:
      return state;
  }

};

export default reducer;
