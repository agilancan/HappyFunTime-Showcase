import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { scale } from '../../utility/Scale';
//Need to duplicate the password field, and add the text related to the character requirements

// This class determines everything to do with the Question Card
export default class AccountEmail extends Component {
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
                    <Text style={styles.innerContainer1Text}>Create a password.</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <TouchableOpacity style={styles.innerContainer2Button} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer2Text}>NEW PASSWORD</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer25}>
                    <TouchableOpacity style={styles.innerContainer2Button2} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer2Text2}>RE-ENTER NEW PASSWORD</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer26}>
                    <Text style={styles.innerContainer26Text}>Your password must be 8 or more characters long. Try making it longer or add symbols like !, #, or %.</Text>
                </View>
                <View style={styles.innerContainer3}>
                    <View style={styles.innerContainer3Thin1} />
                    <View style={styles.innerContainer3Thin2} />
                    <View style={styles.innerContainer3Thin3} />
                </View>
                <View>
                    <TouchableOpacity>
                        <View style={styles.floatingActionButton}/>
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
        flex: 1.8,
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
        letterSpacing: scale(0.8)
    },
    innerContainer2: {
        flex: 1.5,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column'
    },
    innerContainer25: {
        flex: 2,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
    },
    innerContainer26: {
        flex: 2,
    },
    innerContainer26Text: {
        fontSize: scale(14),
        color: "rgba(0, 0, 0, 0.87)",
        lineHeight: scale(19),
        fontWeight: '300',
    },
    innerContainer2Button: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: scale(1),
        borderColor: "rgba(0, 0, 0, 0.12)",
    },
    innerContainer2Text: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: 'roboto',
        fontSize: scale(16),
        fontWeight: '500',
        lineHeight: scale(19),
        letterSpacing: scale(1.5),
        marginTop: "20%",
        paddingBottom: scale(20)
    },
    innerContainer2Button2: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: scale(1),
        borderColor: "rgba(0, 0, 0, 0.12)",
    },
    innerContainer2Text2: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: 'roboto',
        fontSize: scale(16),
        fontWeight: '500',
        lineHeight: scale(19),
        letterSpacing: scale(1.5),
        marginTop: "15%",
        paddingBottom: scale(20)
    },
    innerContainer3: {
        flex: 1.7,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingLeft: '35%',
        paddingRight: '36%',
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
        marginTop: '150%',
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
        right: scale(1), 
    },
});
