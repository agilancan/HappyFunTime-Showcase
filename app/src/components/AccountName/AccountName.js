import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


// This class determines everything to do with the Question Card
export default class AccountName extends Component {
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
                    <Text style={styles.innerContainer1Text}>What's your name?</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <TouchableOpacity style={styles.innerContainer2Button} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer2Text}>DISPLAY NAME</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer3}>
                    <View style={styles.innerContainer3Thin1} />
                    <View style={styles.innerContainer3Thin2} />
                    <View style={styles.innerContainer3Thin3} />
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
        flex: 2,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer1Text: {
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: 45,
        fontWeight: 'bold'
    },
    innerContainer2: {
        flex: 3,
        backgroundColor: "#FFFFFF",
    },
    innerContainer2Button: {
        flex: 0.35,
        backgroundColor: "#FFFFFF",
        aspectRatio: 3,
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.37)",
        borderStyle: "dashed",
    },
    innerContainer2Text: {
        color: "#000000",
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        //lineHeight: 19,
        //letterSpacing: 60
    },
    innerContainer3: {
        flex: 1.5,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: '1%',
        paddingLeft: '20%',
        paddingRight: '20%',
    },
    innerContainer3Thin1: {
        flex: 1,
        backgroundColor: "#F3CBFF",
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer3Thin2: {
        flex: 1,
        backgroundColor: "#B2DF6D",
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer3Thin3: {
        flex: 1,
        backgroundColor: "#FFC767",
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
});
