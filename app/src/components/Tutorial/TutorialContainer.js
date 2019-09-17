import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { scale } from '../../utility/Scale';
// This class determines everything to do with the Question Card
export default class TutorialContainer extends PureComponent {
    render() {
        const { containerText, imgPath, pushPage, barMargins } = this.props;
        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Image style={styles.tutorial1} source={imgPath} />
                </View>
                <View style={styles.innerContainer2}>
                    <Text style={styles.innerContainer2Text}>{containerText}</Text>
                </View>
                <View style={styles.innerContainer6}>
                    <View style={{ ...styles.bar, marginTop: barMargins[0], backgroundColor: "#F3CBFF" }} />
                    <View style={{ ...styles.bar, marginTop: barMargins[1], backgroundColor: "#B2DF6D" }} />
                    <View style={{ ...styles.bar, marginTop: barMargins[2], backgroundColor: "#FFC767" }} />
                    <View style={{ ...styles.bar, marginTop: barMargins[3], backgroundColor: "#94E5FF" }} />
                    <View style={{ ...styles.bar, marginTop: barMargins[4], backgroundColor: "#FFE66A" }} />
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
TutorialContainer.propTypes = {
    containerText: PropTypes.string.isRequired,
    imgPath: PropTypes.number.isRequired,
    pushPage: PropTypes.func.isRequired,
    barMargins: PropTypes.array.isRequired
};


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
        flex: 8,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginTop: scale(60),
        marginLeft: scale(5),
        marginRight: scale(5),
        borderWidth: scale(4),
        borderRadius: scale(30),
        borderColor: 'rgba(0, 0, 0, 0.87)',
        paddingLeft: scale(10),
        paddingRight: scale(10)
    },
    tutorial1: {
        flex: 3,
        resizeMode: 'contain',
        aspectRatio: 0.8,
        borderRadius: scale(10)
    },
    innerContainer2: {
        flex: 2,
        justifyContent: 'center'
    },
    innerContainer2Text: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: scale(14),
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: scale(3),
        lineHeight: scale(21)
    },
    innerContainer6: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: '0%',
        paddingLeft: '27%',
        paddingRight: '27%'
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
