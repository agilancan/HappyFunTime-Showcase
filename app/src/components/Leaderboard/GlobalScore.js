import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale } from '../../utility/Scale';
import PlayerCard from '../PlayerCard/PlayerCard';


// This class determines everything to do with the Posted Notes
export default class GlobalScore extends Component {
    render() {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.rankContainer}>
                    <Text style={styles.rankText}>1</Text>
                </View>
                <PlayerCard style={styles.playerCard}/>
                <Text style={styles.playerName}>AgilanCAN</Text>
                <Text style={styles.playerScore}>123,432</Text>
            </View>
        );
    }
}




// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-evenly'
    },
    rankContainer: {
        flex: 1,
        backgroundColor: 'black',
        aspectRatio: 1,
        width: scale(56),
        height: scale(56),
        borderRadius: scale(30),
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(20)
    },
    rankText: {
        color: 'white',
        fontFamily: 'roboto',
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center'
    }, 
    playerCard: {
        flex: 1,
        resizeMode: 'contain',
        //marginRight: scale(50)
    },
    playerName: {
        flex: 2,
        fontFamily: 'roboto',
        fontSize: scale(16),
        fontWeight: 'bold',
        marginLeft: scale(20),
        marginRight: scale(35),
    },
    playerScore: {
        flex: 2,
        fontFamily: 'roboto_black',
        fontSize: scale(16),
    },
});