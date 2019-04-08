import { Navigation } from "react-native-navigation";

import Welcome from "../components/Welcome/Welcome";

/*const screens = (store, Provider) => {
  Navigation.registerComponentWithRedux(
    "Welcome",
    () => Welcome,
    Provider,
    store
  );
};*/

const screens = () => {
  Navigation.registerComponent("Welcome", () => Welcome);
};
export default appScreens;
