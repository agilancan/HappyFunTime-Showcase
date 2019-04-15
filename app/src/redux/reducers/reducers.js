import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { reducer as formReducer } from "redux-form";

const makeRootReducer = asyncReducers =>
  combineReducers({
    firebase: firebaseStateReducer,
    firestore: firestoreReducer,
    ...asyncReducers
  });

export default makeRootReducer;
