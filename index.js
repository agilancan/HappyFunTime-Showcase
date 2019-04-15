import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import AppScreens from "./app/src/navigation/AppScreens";
import AppStore from "./app/src/redux/store/AppStore";
//import EvoPassStore from "./app/src/redux/store/EvoPassStore";

const initialState = { firebase: {} };
const store = AppStore(initialState);
AppScreens(store, Provider);

export default function App() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "AgilanApp"
            }
          }
        ]
      }
    }
  });
}

App();
