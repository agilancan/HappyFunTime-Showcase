import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { scale } from '../../utility/Scale';
import PlayerCard from '../PlayerCard/PlayerCard';


// This class determines everything to do with the Posted Notes
export default class GlobalScore extends Component {
    render() {
        const { user } = this.props;
        if (user === undefined) return null;
        return (
            <View style={styles.outerContainer}>
                <View style={styles.rankContainer}>
                    <Text style={styles.rankText}>{user.rank}</Text>
                </View>
                <PlayerCard user={{ avatarURL: user.avatarURL }} style={styles.playerCard} />
                <Text style={styles.playerName}>{user.displayName}</Text>
                <Text style={styles.playerScore}>{user.points}</Text>
            </View>
        );
    }
}




// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    playerCard: {
        flex: 1,
        resizeMode: 'contain'
    },
    playerName: {
        flex: 2,
        fontSize: scale(16),
        fontWeight: 'bold',
        marginLeft: scale(20),
        marginRight: scale(35)
    },
    playerScore: {
        flex: 2,
        fontSize: scale(16)
    }
});