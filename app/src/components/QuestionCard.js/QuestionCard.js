import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PlayerCard from './PlayerCard'


// This class determines everything to do with the Question Card
export default class QuestionCard extends Component {
    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.questionCard}>
                    <Text style={styles.loadingText}>Picking a person {'\n'}to ask a question...</Text>
                    {/* <Text style={styles.loadingNumber}>3</Text> */}
                    <PlayerCard />
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
    questionCard: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: 165,
        width: 275,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        margin: "0%",
        paddingTop: "4%",
        paddingBottom: "0%",
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

