import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import PlayerCard from '../PlayerCard/PlayerCard';
import { scale } from '../../utility/Scale';

// This class determines everything to do with the Question Card
export default class MainMenu extends Component {
    static options(passProps) {
        return {
            statusBar: {
                backgroundColor: 'transparent',
                drawBehind: true,
                visible: true,
                style: 'dark'
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
                    <Text style={styles.innerContainer1Text}>
                        Breath in ... breath out
                      {' '}
                        {'\n'}
                        {' '}
                        ... good ... draw … :)
                    </Text>
                    <View style={styles.innerContainer1Right}>
                        <View style={styles.innerContainer1Box}>
                            <View style={styles.innerContainer1BoxInner}>
                                <PlayerCard style={styles.playerCard} />
                            </View>
                        </View>
                        <Image
                            style={styles.leaderboard}
                            source={require('../../../assets/Leaderboard/round_list_black_24dp.png')}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={this.props.signInAnonymously} style={styles.innerContainer2}>
                    <Image
                        style={styles.playButton}
                        source={require('../../../assets/Play/round_play_circle_filled_black_48dp.png')}
                    />
                </TouchableOpacity>
                <View style={styles.innerContainer3}>
                    <TouchableOpacity
                        style={styles.innerContainer3Box}
                        onPress={() => alert('This works!!!!')}
                    >
                        <Text style={styles.innerContainer3Text}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer4}>
                    <TouchableOpacity
                        style={styles.innerContainer4Facebook}
                        onPress={() => alert('This works!!!!')}
                    >
                        <Text style={styles.innerContainer4Text}>f</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.innerContainer4Google}
                        onPress={() => alert('This works!!!!')}
                    >
                        <Text style={styles.innerContainer4Text}>G</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer5}>
                    <TouchableOpacity
                        style={styles.innerContainer5Button}
                        onPress={() => alert('This works!!!!')}
                    >
                        <Text style={styles.innerContainer5Text}>Create Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer6}>
                    <View style={styles.innerContainer6Thin1} />
                    <View style={styles.innerContainer6Thin2} />
                    <View style={styles.innerContainer6Thin3} />
                    <View style={styles.innerContainer6Thin4} />
                    <View style={styles.innerContainer6Thin5} />
                </View>
            </View>
        );
    }
}
MainMenu.propTypes = {
    signInAnonymously: PropTypes.func.isRequired
};


// All the styles
const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        margin: '0%',
        padding: '0%'
    },
    innerContainer1: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer1Right: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    innerContainer1Text: {
        flex: 3,
        flexDirection: 'row',
        color: '#000000',
        fontFamily: 'roboto',
        fontSize: scale(25),
        fontWeight: 'bold',
        paddingBottom: scale(20),
        marginLeft: scale(10)
    },
    innerContainer1Box: {
        flex: 2.5,
        backgroundColor: '#000000',
        borderWidth: scale(4),
        margin: scale(20)
    },
    innerContainer1BoxInner: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '5%'
    },
    playerCard: {
        flex: 1,
        resizeMode: 'contain'
    },
    leaderboard: {
        flex: 3,
        resizeMode: 'contain',
        height: scale(50),
        width: scale(50)
    },
    playButton: {
        flex: 3,
        resizeMode: 'contain',
        height: scale(100),
        width: scale(100)
    },
    innerContainer2: {
        flex: 1.3,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer3: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer3Box: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(4),
        borderRadius: scale(100),
        borderColor: '#000000',
        borderStyle: 'dashed',
        marginTop: scale(30),
        marginBottom: scale(5),
        paddingTop: scale(20),
        paddingBottom: scale(20)
    },
    innerContainer3Text: {
        color: '#000000',
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: scale(40),
        paddingRight: scale(40),
        aspectRatio: 7,
        letterSpacing: scale(1)
    },
    innerContainer4: {
        flex: 1.5,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer4Facebook: {
        flex: 0.14,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(4),
        borderRadius: scale(100),
        borderColor: '#000000',
        borderStyle: 'dashed',
        margin: scale(10),
        aspectRatio: 1,
        marginRight: 40
    },
    innerContainer4Google: {
        flex: 0.14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(4),
        borderRadius: scale(100),
        borderColor: '#000000',
        borderStyle: 'dashed',
        margin: scale(10),
        aspectRatio: 1
    },
    innerContainer4Text: {
        color: 'black',
        fontSize: scale(35),
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '10%'
    },
    innerContainer5: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer5Button: {
        flex: 0.6,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 5,
        borderRadius: scale(100)
    },
    innerContainer5Text: {
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: scale(1)
    },
    innerContainer6: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: '1%',
        paddingLeft: '27%',
        paddingRight: '27%'
    },
    innerContainer6Thin1: {
        flex: 1,
        backgroundColor: '#F3CBFF',
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin2: {
        flex: 1,
        backgroundColor: '#B2DF6D',
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin3: {
        flex: 1,
        backgroundColor: '#FFC767',
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin4: {
        flex: 1,
        backgroundColor: '#94E5FF',
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    },
    innerContainer6Thin5: {
        flex: 1,
        backgroundColor: '#FFE66A',
        height: '100%',
        width: '30%',
        marginTop: '50%',
        marginLeft: '1%',
        marginRight: '1%'
    }
});
