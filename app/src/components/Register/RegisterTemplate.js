import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { scale, verticalScale } from '../../utility/Scale';

export default class RegisterTemplate extends PureComponent {
    render() {
        const { titleText, textInputPlaceholder, barMargins, pushPage, type } = this.props;
        if (type === "password") {
            return (
                <View style={styles2.outerContainer}>
                    <View style={styles2.innerContainer1}>
                        <Text style={styles2.innerContainer1Text}>{titleText}</Text>
                    </View>
                    <View style={styles2.innerContainer2}>
                        <TouchableOpacity style={styles2.innerContainer2Button} onPress={() => alert('This works!!!!')}>
                            <Text style={styles2.innerContainer2Text}>NEW PASSWORD</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles2.innerContainer25}>
                        <TouchableOpacity style={styles2.innerContainer2Button2} onPress={() => alert('This works!!!!')}>
                            <Text style={styles2.innerContainer2Text2}>RE-ENTER NEW PASSWORD</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles2.innerContainer26}>
                        <Text style={styles2.innerContainer26Text}>Your password must be 8 or more characters long. Try making it longer or add symbols like !, #, or %.</Text>
                    </View>
                    <View style={styles.innerContainer3}>
                        <View style={{ ...styles.bar, marginTop: barMargins[0], backgroundColor: "#F3CBFF" }} />
                        <View style={{ ...styles.bar, marginTop: barMargins[1], backgroundColor: "#B2DF6D" }} />
                        <View style={{ ...styles.bar, marginTop: barMargins[2], backgroundColor: "#FFC767" }} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={pushPage} style={styles.pushPageButton}>
                            <Icon name="navigate-next" size={scale(30)} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Text style={styles.innerContainer1Text}>{titleText}</Text>
                </View>
                <View style={styles.innerContainer2}>
                    <TouchableOpacity style={styles.innerContainer2Button} onPress={() => alert('This works!!!!')}>
                        <Text style={styles.innerContainer2Text}>{textInputPlaceholder}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer3}>
                    <View style={{ ...styles.bar, marginTop: barMargins[0], backgroundColor: "#F3CBFF" }} />
                    <View style={{ ...styles.bar, marginTop: barMargins[1], backgroundColor: "#B2DF6D" }} />
                    <View style={{ ...styles.bar, marginTop: barMargins[2], backgroundColor: "#FFC767" }} />
                </View>
                <View>
                    <TouchableOpacity onPress={pushPage} style={styles.pushPageButton}>
                        <Icon name="navigate-next" size={scale(30)} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
RegisterTemplate.propTypes = {
    titleText: PropTypes.string.isRequired,
    textInputPlaceholder: PropTypes.string.isRequired,
    pushPage: PropTypes.func.isRequired,
    barMargins: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
};

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
    bar: {
        flex: 1,
        height: '100%',
        width: '30%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    pushPageButton: {
        width: scale(56),
        height: scale(56),
        borderRadius: scale(30),
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        position: 'absolute',
        bottom: scale(16.9),
        right: scale(1),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const styles2 = StyleSheet.create({
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
        backgroundColor: "#FFFFFF"
    },
    innerContainer1Text: {
        fontFamily: 'roboto_condensed_bold_italic',
        fontSize: scale(43),
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
        flexDirection: 'column'
    },
    innerContainer26: {
        flex: 2
    },
    innerContainer26Text: {
        fontSize: scale(14),
        color: "rgba(0, 0, 0, 0.87)",
        lineHeight: scale(19),
        fontWeight: '300'
    },
    innerContainer2Button: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: scale(1),
        borderColor: "rgba(0, 0, 0, 0.12)"
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
        borderColor: "rgba(0, 0, 0, 0.12)"
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
        paddingRight: '36%'
    }
});
