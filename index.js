// import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
//import AppScreens from "./App/src/navigation/AppScreens";
//import EvoPassStore from "./app/src/redux/store/EvoPassStore";

//const initialState = { firebase: {} };
//const store = EvoPassStore(initialState);
import AgilanApp from "./app/src/components/AgilanApp/AgilanApp";
Navigation.registerComponent("AgilanApp", () => AgilanApp);

Navigation.events().registerAppLaunchedListener(() => {
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
});
