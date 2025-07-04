import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from '../../utility/Scale';


// This class determines everything to do with the Posted Notes
export default class PlayerCard extends Component {
    render() {
        const { user, backgroundColor, borderColor, transform } = this.props;
        let bColor = backgroundColor;
        if (user === undefined) {
            return (<View style={{
                ...styles.postedNote,
                backgroundColor: bColor,
                borderColor,
                transform
            }} >
                <Text style={styles.waitingTxt}>Waiting...</Text>
            </View>)
        }
        const { roundsWon, avatarURL } = user;
        return (
            <View style={{
                ...styles.postedNote,
                backgroundColor: bColor,
                borderColor,
                transform
            }} >
                {avatarURL !== undefined && avatarURL !== null ? <Image
                    style={{ ...styles.imageNote, transform }}
                    resizeMode={'contain'}
                    source={{ uri: avatarURL }} /> : <Text style={styles.waitingTxt}>Waiting...</Text>}
                {
                    roundsWon !== undefined ? <View style={{
                        position: "absolute", top: 1.5, right: 1.5, backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: scale(20),
                        height: scale(20),
                        borderRadius: scale(10)
                    }}>
                        <Text style={{ fontSize: scale(15) }}>{roundsWon}</Text>
                    </View> : null
                }
            </View>
        );
    }
}


// Setting up prop types
PlayerCard.defaultProps = {
    backgroundColor: "#94E5FF",
    borderColor: "#94E5FF",
    transform: [{ rotate: '0deg' }],
    user: undefined
}

PlayerCard.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    transform: PropTypes.any.isRequired,
    user: PropTypes.object
};


// All the styles
const styles = StyleSheet.create({
    postedNote: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        height: scale(100),
        width: scale(100),
        borderWidth: scale(1),
        borderTopLeftRadius: scale(0),
        borderTopRightRadius: scale(1),
        borderBottomLeftRadius: scale(5),
        margin: "3%",
        padding: '0%'
    },
    imageNote: {
        position: 'absolute',
        height: scale(80),
        width: scale(80)
    },
    waitingTxt: {
        fontSize: scale(16),
        color: '#000'
    }
});


//add more props {name, ID}
//transfor -> rotation
//add 'WAITING PLAYER'