import { Navigation } from 'react-native-navigation';
import App from '../components/App/App';
import Lobby from '../components/Lobby/Lobby';
import Tutorial from '../components/Tutorial/Tutorial';
import DrawAvatar from '../components/Draw/DrawAvatar';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import LeaderBoard from '../components/Leaderboard/Leaderboard';

const AppScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux('Welcome', () => Welcome, Provider, store);
  Navigation.registerComponentWithRedux('App', () => App, Provider, store);
  Navigation.registerComponentWithRedux('Lobby', () => Lobby, Provider, store);
  Navigation.registerComponentWithRedux('Tutorial', () => Tutorial, Provider, store);
  Navigation.registerComponentWithRedux('DrawAvatar', () => DrawAvatar, Provider, store);
  Navigation.registerComponentWithRedux('Register', () => Register, Provider, store);
  Navigation.registerComponentWithRedux('Login', () => Login, Provider, store);
  Navigation.registerComponentWithRedux('LeaderBoard', () => LeaderBoard, Provider, store);
};
export default AppScreens;
