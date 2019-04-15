import { Navigation } from "react-native-navigation";

import Welcome from "../components/Welcome/Welcome";

const AppScreens = (store, Provider) => {
  Navigation.registerComponentWithRedux(
    "Welcome",
    () => Welcome,
    Provider,
    store
  );
};
export default AppScreens;
