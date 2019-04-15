import { Navigation } from "react-native-navigation";

import Welcome from "../components/Welcome/Welcome";
import AgilanApp from "../components/AgilanApp/AgilanApp";

const AppScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux(
    "Welcome",
    () => Welcome,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "AgilanApp",
    () => AgilanApp,
    Provider,
    store
  );
};
export default AppScreens;
