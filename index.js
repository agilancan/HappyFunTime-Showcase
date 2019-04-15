import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import AppScreens from "./app/src/navigation/AppScreens";
import AppStore from "./app/src/redux/store/AppStore";
//import EvoPassStore from "./app/src/redux/store/EvoPassStore";

const initialState = { firebase: {} };
const store = AppStore(initialState);
AppScreens(store, Provider);

//import AgilanApp from "./app/src/components/AgilanApp/AgilanApp";
//import Welcome from "./app/src/components/Welcome/Welcome";

export default function App() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "Welcome"
            }
          }
        ]
      }
    }
  });
}

App();
