import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";


// This class determines everything to do with the Question Card
export default class MainMenu extends Component {
    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Text>sdfsdf</Text>
                    <View><Image style={styles.leaderboard} source={require('../../../assets/Leaderboard/round_list_black_48dp.png')} /></View>  
                </View>
                <View style={styles.innerContainer2}>  
                </View>
                <View style={styles.innerContainer3}>  
                </View>
                <View style={styles.innerContainer4}>  
                </View>
                <View style={styles.innerContainer5}>  
                </View>
                <View style={styles.innerContainer6}>  
                </View>
            </View>
        );
    }
}
//app\assets\Leaderboard\round_list_black_48dp.png
//C: \Users\agila\Documents\GitHub\HappyFunTimes\app\assets\Leaderboard\round_list_black_48dp.png
// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "white",
        flex: 1,
        margin: "0%",
        padding: "0%"
    },
    innerContainer1: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer2: {
        flex: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer3: {
        flex: 1,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer4: {
        flex: 1,
        backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer5: {
        flex: 1,
        backgroundColor: "purple",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer6: {
        flex: 1,
        backgroundColor: "brown",
        justifyContent: "center",
        alignItems: "center",
    },
    leaderboard: {
        width: 200,
        height: 200
    }
});
