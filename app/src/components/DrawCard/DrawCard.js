import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';


// This class determines everything to do with the Draw Card
export default class DrawCard extends Component {
    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.drawCard}>
                    <Text style={styles.titleText}>DRAW YOURSELF</Text>
                </View>
            </View>
        );
    }
}


// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "green",
        // backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: "0%",
        padding: "0%",
    },
    drawCard: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
        width: 350,
        borderRadius: 7,
        paddingTop: 10
    },
    titleText: {
        color: 'rgba(0, 0, 0, 0.87)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
    }
});

