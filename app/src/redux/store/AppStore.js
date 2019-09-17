import { compose, createStore } from 'redux';
import RNFirebase from 'react-native-firebase';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import AsyncStorage from '@react-native-community/async-storage';

import makeRootReducer from '../reducers/reducers';

const reactNativeFirebaseConfig = {
  debug: false
};
// for more config options, visit http://docs.react-redux-firebase.com/history/v2.0.0/docs/api/compose.html
const reduxFirebaseConfig = {
  // userProfile: 'Users', // save users profiles to 'Users' collection
  // useFirestoreForProfile: true,
  // enableLogging: false,
  ReactNative: { AsyncStorage },
  enableRedirectHandling: false
};

export default (initialState = { firebase: {} }) => {
  // initialize firebase
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);
  firebase.firestore();
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, reduxFirebaseConfig),
    reduxFirestore(firebase)
  )(createStore);

  const store = createStoreWithFirebase(makeRootReducer(), initialState);

  /* const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      reactReduxFirebase(firebase, reduxFirebaseConfig),
      reduxFirestore(firebase),
    ),
    applyMiddleware(logger),
  ); */
  return store;
};
