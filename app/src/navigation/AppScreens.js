import { Navigation } from 'react-native-navigation';
import Welcome from '../components/Welcome/Welcome';
import App from '../components/App/App';
import Lobby from '../components/Lobby/Lobby';
import Tutorial from '../components/Tutorial/Tutorial';

const AppScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux('Welcome', () => Welcome, Provider, store);
  Navigation.registerComponentWithRedux('App', () => App, Provider, store);
  Navigation.registerComponentWithRedux('Lobby', () => Lobby, Provider, store);
  Navigation.registerComponentWithRedux('Tutorial', () => Tutorial, Provider, store);
};
export default AppScreens;
