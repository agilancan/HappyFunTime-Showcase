// import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
//import AppScreens from "./App/src/navigation/AppScreens";
//import EvoPassStore from "./app/src/redux/store/EvoPassStore";

//const initialState = { firebase: {} };
//const store = EvoPassStore(initialState);
import AgilanApp from "./app/src/components/AgilanApp/AgilanApp";
import Welcome from "./app/src/components/Welcome/Welcome";

Navigation.registerComponent("Welcome", () => Welcome);

Navigation.events().registerAppLaunchedListener(() => {
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
});
