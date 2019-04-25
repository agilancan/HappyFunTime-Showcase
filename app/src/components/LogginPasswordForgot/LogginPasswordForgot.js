import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { scale } from '../../utility/Scale';


// This class determines everything to do with the Question Card
export default class LogginPasswordForgot extends Component {
    static options(passProps) {
        return {
            statusBar: {
                backgroundColor: "transparent",
                drawBehind: true,
                visible: false,
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
                    <Text style={styles.innerContainer1Text}>Your password?</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <TouchableOpacity style={styles.innerContainer2Button} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer2Text}>ENTER PASSWORD</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.innerContainer3Text}>Forgot password?</Text>
                <View>
                    <TouchableOpacity>
                        <View style={styles.floatingForgotButton}>
                            <View style={styles.floatingForgotButtonContainer1}>
                                <Text style={styles.floatingForgotTextX}>X</Text>
                                <Text style={styles.floatingForgotText1}>FORGOT PASSWORD</Text>
                            </View>
                            <View>
                                <Text style={styles.floatingForgotText2}>We sent an email with instructions to AgilanCAN@gmail.com</Text>
                            </View>
                            <View>
                                <Text style={styles.floatingForgotText3}>Please check your email to reset your password</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        flex: 2,
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
        letterSpacing: scale(1)
    },
    innerContainer2: {
        flex: 6,
        backgroundColor: "#FFFFFF",
    },
    innerContainer2Button: {
        flex: 0.9,
        backgroundColor: "#FFFFFF",
        aspectRatio: 3,
        borderBottomWidth: scale(1),
        borderColor: "rgba(0, 0, 0, 0.12)",
        marginBottom: "85%",
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
        paddingRight: '36%',
    },
    innerContainer3Text: {
        color: "rgba(0, 0, 0, 0.87)",
        fontFamily: 'roboto',
        fontSize: scale(14),
        fontWeight: '400',
        lineHeight: scale(19),
        letterSpacing: scale(1.5),
        marginTop: "20%",
        textAlign: 'center',
        paddingBottom: "10%"
    },
    floatingForgotButton: {
        width: scale(280),
        height: scale(248),
        borderRadius: scale(25),
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        position: 'absolute',
        bottom: scale(204),
        right: scale(27),
    },
    floatingForgotButtonContainer1: {
        flexDirection: 'row',
        borderBottomWidth: scale(1),
        borderColor: "rgba(255, 255, 255, 0.12)",
        paddingBottom: scale(15)
    },
    floatingForgotTextX: {
        color: "#FFFFFF",
        fontFamily: 'roboto',
        fontSize: scale(20),
        fontWeight: '400',
        lineHeight: scale(19),
        marginTop: "7.5%",
        paddingLeft: '7%'
    },
    floatingForgotText1: {
        color: "#FFFFFF",
        fontFamily: 'roboto',
        fontSize: scale(14),
        fontWeight: '500',
        lineHeight: scale(19),
        letterSpacing: scale(1.5),
        marginTop: "7%",
        paddingLeft: '13.5%'
    },
    floatingForgotText2: {
        color: "#FFFFFF",
        fontFamily: 'roboto',
        fontSize: scale(14),
        fontWeight: '400',
        lineHeight: scale(19),
        letterSpacing: scale(1),
        marginTop: "12%",
        //marginBottom: "14%",
        textAlign: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        borderBottomWidth: scale(1),
        borderColor: "rgba(255, 255, 255, 0.12)",
        paddingBottom: scale(35)
    },
    floatingForgotText3: {
        color: "#FFFFFF",
        fontFamily: 'roboto',
        fontSize: scale(14),
        fontWeight: '400',
        lineHeight: scale(19),
        letterSpacing: scale(1),
        marginTop: "9%",
        textAlign: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
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
