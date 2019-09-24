import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { scale, verticalScale } from '../../utility/Scale';

export default class LoginTemplate extends PureComponent {
    render() {
        const { titleText, textInputPlaceholder, barMargins, pushPage, type } = this.props;
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
LoginTemplate.propTypes = {
    titleText: PropTypes.string.isRequired,
    textInputPlaceholder: PropTypes.string.isRequired,
    pushPage: PropTypes.func.isRequired
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
