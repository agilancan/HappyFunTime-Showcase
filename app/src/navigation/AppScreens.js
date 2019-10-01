import { Navigation } from 'react-native-navigation';
import App from '../components/App/App';
import Lobby from '../components/Lobby/Lobby';
import Tutorial from '../components/Tutorial/Tutorial';
import DrawAvatar from '../components/Draw/DrawAvatar';
import DrawQuestion from '../components/Draw/DrawQuestion';
import DrawAnswer from '../components/Draw/DrawAnswer';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import VoteAnswer from '../components/VoteAnswer/VoteAnswer';

const AppScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux('Welcome', () => Welcome, Provider, store);
  Navigation.registerComponentWithRedux('App', () => App, Provider, store);
  Navigation.registerComponentWithRedux('Lobby', () => Lobby, Provider, store);
  Navigation.registerComponentWithRedux('Tutorial', () => Tutorial, Provider, store);
  Navigation.registerComponentWithRedux('DrawAvatar', () => DrawAvatar, Provider, store);
  Navigation.registerComponentWithRedux('DrawQuestion', () => DrawQuestion, Provider, store);
  Navigation.registerComponentWithRedux('DrawAnswer', () => DrawAnswer, Provider, store);
  Navigation.registerComponentWithRedux('Register', () => Register, Provider, store);
  Navigation.registerComponentWithRedux('Login', () => Login, Provider, store);
  Navigation.registerComponentWithRedux('VoteAnswer', () => VoteAnswer, Provider, store);
};
export default AppScreens;
