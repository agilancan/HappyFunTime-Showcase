import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import AppScreens from './app/src/navigation/AppScreens';
import AppStore from './app/src/redux/store/AppStore';

Navigation.events().registerAppLaunchedListener(() => {
  const initialState = { firebase: {} };
  const store = AppStore(initialState);
  AppScreens(store, Provider);
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'App'
            }
          }
        ]
      }
    }
  });
});
