import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


// This class determines everything to do with the Question Card
export default class AnswerCard extends Component {
    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.questionDrawing}>
                </View>
                <View style={styles.answerCard}>
                    <Text style={styles.loadingText}>Picking two{'\n'}people to answer...</Text>
                    <Text style={styles.loadingNumber}>3</Text>
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
        padding: "0%"
    },
    questionDrawing: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: 300,
        width: 240,
        borderRadius: 30,
        marginBottom: "2%",
        paddingTop: "4%",
        paddingBottom: "1%",
        borderWidth: 4,
        borderColor: 'rgba(0, 0, 0, 0.87)'
    },
    answerCard: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: 165,
        width: 275,
        borderRadius: 50,
        marginTop: "2%",
        paddingTop: "4%",
        paddingBottom: "0%"
    },
    loadingText: {
        color: 'rgba(0, 0, 0, 0.87)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
    },
    loadingNumber: {
        color: 'rgba(0, 0, 0, 0.87)',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: 60,
        fontWeight: '400',
        textAlign: 'center'
    }
});

