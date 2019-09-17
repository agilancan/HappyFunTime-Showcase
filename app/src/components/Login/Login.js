import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { scale, verticalScale } from '../../utility/Scale';


// This class determines everything to do with the Question Card
export default class Login extends Component {
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
                    <Text style={styles.innerContainer1Text}>What's your email?</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <TouchableOpacity style={styles.innerContainer2Button} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer2Text}>EMAIL ADDRESS</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer3}>
                    <View style={styles.innerContainer3Thin1} />
                    <View style={styles.innerContainer3Thin2} />
                    <View style={styles.innerContainer3Thin3} />
                </View>
                <View>
                    <TouchableOpacity>
                        <View style={styles.floatingActionButton} />
                    </TouchableOpacity>
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
        backgroundColor: "#FFFFFF"
    },
    innerContainer1Text: {
        fontFamily: 'roboto_condensed_bold_italic',
        fontSize: scale(43),
        color: "rgba(0, 0, 0, 0.87)",
        transform: [{ rotate: '354deg' }],
        marginTop: '20%',
        lineHeight: scale(54),
        letterSpacing: scale(1)
    },
    innerContainer2: {
        flex: 6,
        backgroundColor: "#FFFFFF"
    },
    innerContainer2Button: {
        flex: 0.8,
        backgroundColor: "#FFFFFF",
        aspectRatio: 3,
        borderBottomWidth: verticalScale(1),
        borderColor: "rgba(0, 0, 0, 0.12)",
        marginBottom: "85%"
    },
    innerContainer2Text: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: 'roboto',
        fontSize: scale(16),
        fontWeight: '500',
        lineHeight: scale(19),
        letterSpacing: scale(1.5),
        marginTop: "20%"
    },
    innerContainer3: {
        flex: 1.5,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: '0%',
        paddingLeft: '35%',
        paddingRight: '36%'
    },
    innerContainer3Thin1: {
        flex: 1,
        backgroundColor: "#F3CBFF",
        height: '100%',
        width: '30%',
        marginTop: '150%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer3Thin2: {
        flex: 1,
        backgroundColor: "#B2DF6D",
        height: '100%',
        width: '30%',
        marginTop: '150%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer3Thin3: {
        flex: 1,
        backgroundColor: "#FFC767",
        height: '100%',
        width: '30%',
        marginTop: '100%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    floatingActionButton: {
        width: scale(56),
        height: scale(56),
        borderRadius: scale(30),
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        position: 'absolute',
        bottom: scale(16.9),
        right: scale(1)
    }
});
