import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { scale, verticalScale } from '../../utility/Scale';


// This class determines everything to do with the Question Card
export default class AccountExist extends Component {
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
                    <Text style={styles.innerContainer1Text}>You have an account with us already!</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <Text style={styles.innerContainer2Text}>This Google account is already in use. Please try logging in with this account. You do not need to register again.</Text>
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
        flex: 5,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
    },
    innerContainer1Text: {
        fontFamily: 'roboto_condensed_bold_italic', 
        fontSize:  scale(43),
        color: "rgba(0, 0, 0, 0.87)",
        transform: [{ rotate: '354deg' }],
        marginTop: '20%',
        lineHeight: scale(54),
        letterSpacing: scale(1),
    },
    innerContainer2: {
        flex: 7,
        backgroundColor: "#FFFFFF",
    },
    innerContainer2Text: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: 'roboto',
        fontSize: scale(14),
        fontWeight: '300',
        marginTop: "10%",
        letterSpacing: scale(1),
    },
});
