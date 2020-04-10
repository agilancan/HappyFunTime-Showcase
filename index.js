import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import AppScreens from './app/src/navigation/AppScreens';
import makeRootReducer from './app/src/redux/reducers/reducers';

Navigation.events().registerAppLaunchedListener(() => {
  const store = createStore(makeRootReducer());
  AppScreens(store, Provider);
  Navigation.setRoot({
    root: {
      component: {
        name: 'App'
      }
    }
  });
});
