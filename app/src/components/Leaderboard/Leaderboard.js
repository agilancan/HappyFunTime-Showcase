import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { scale } from '../../utility/Scale';
import GlobalScore from "../Leaderboard/GlobalScore";


// This class determines everything to do with the Question Card
export default class Leaderboard extends Component {
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
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Text style={styles.innerContainer1Text}>Global leaderboard.</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <GlobalScore />
                    <GlobalScore />
                    <GlobalScore />
                    <GlobalScore />
                    <GlobalScore />
                    <GlobalScore />
                    <GlobalScore />
                </View>
            </View>
        );
    }
}


// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        margin: "0%",
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    innerContainer1: {
        flex: 3,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
    },
    innerContainer1Text: {
        fontFamily: 'roboto_condensed_bold_italic',
        fontSize: scale(43),
        color: "rgba(0, 0, 0, 0.87)",
        transform: [{ rotate: '354deg' }],
        marginTop: '20%',
        lineHeight: scale(54),
        letterSpacing: scale(0.3)
    },
    innerContainer2: {
        flex: 6,
        backgroundColor: "#FFFFFF",
    },
});
