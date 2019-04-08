import React from "react";
import { View, Image, Dimensions, Text, Linking } from "react-native";

export default class Welcome extends React.Component {
  static options(passProps) {
    return {
      statusBar: {
        backgroundColor: "transparent",
        drawBehind: true,
        visible: true,
        style: "dark"
      },
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false
      },
      passProps
    };
  }

  render() {
    return (
      <View>
        <Text>Helllo</Text>
      </View>
    );
  }
}
