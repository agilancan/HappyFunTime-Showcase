import React from "react";
import { View, Image, Dimensions, Text, StyleSheet } from "react-native";
import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";

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
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={"black"}
            strokeWidth={7}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
