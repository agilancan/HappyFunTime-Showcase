import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Navigation } from 'react-native-navigation';

import VoteAnswer from '../VoteAnswer/VoteAnswer';
import DrawAnswer from '../Draw/DrawAnswer';
import { scale } from '../../utility/Scale';
import PlayerCard from "../PlayerCard/PlayerCard";
import Globals from '../../Globals';

const { DATABASE } = Globals;

class Lobby extends Component {
    msg = () => {
        const { users, lobbyInfo } = this.props.GameReducer;
        const { minUsers, status, state } = lobbyInfo;
        if (status === undefined) return null;
        if (status === DATABASE.LOBBY_STATUS.PENDING && users.length < minUsers) {
            return (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.8
                }}>
                    <View style={styles.msgContainer}>
                        <View style={styles.msgInnerContainer}>
                            <Text style={{ color: '#000' }}>Waiting for players...</Text>
                            <Text style={{ color: '#000' }}>{users.length + '/' + minUsers}</Text>
                        </View>
                    </View>
                </View>

            );
        }
        if (state === 1 && status === DATABASE.LOBBY_STATUS.IN_PROGRESS) {
            return <DrawAnswer style={{ position: 'absolute', opacity: 0.8 }} />
        }
        if (state === 2 && status === DATABASE.LOBBY_STATUS.IN_PROGRESS) {
            return <VoteAnswer style={{ position: 'absolute', opacity: 0.8 }} />;
        }
        return null;
    }

    topRightUI = () => {
        <View style={{
            position: 'absolute',
            top: 40,
            right: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderColor: '#000',
            opacity: 0.8
        }}>
            <Text>3</Text>
        </View>
    }
    render() {
        const { lobbyInfo, users } = this.props.GameReducer;
        if (lobbyInfo === undefined) return null;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <PlayerCard transform={[{ rotate: '3deg' }]} user={users[0]} />
                        <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={users[4]} />
                        <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} user={users[8]} />
                        <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={users[12]} />
                        <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} transform={[{ rotate: '3deg' }]} user={users[16]} />
                        <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} user={users[20]} />
                        <PlayerCard transform={[{ rotate: '3deg' }]} user={users[24]} />
                    </View>
                    <View style={styles.innerContainer}>
                        <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} user={users[1]} />
                        <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} user={users[5]} />
                        <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} user={users[9]} />
                        <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} user={users[13]} />
                        <PlayerCard user={users[17]} />
                        <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} user={users[21]} />
                        <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={users[25]} />
                    </View>
                    <View style={styles.innerContainer}>
                        <PlayerCard transform={[{ rotate: '3deg' }]} user={users[2]} />
                        <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={users[6]} />
                        <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} user={users[10]} />
                        <PlayerCard user={users[14]} />
                        <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} user={users[18]} />
                        <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={users[22]} />
                        <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} user={users[26]} />
                    </View>
                    <View style={styles.innerContainer}>
                        <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} user={users[3]} />
                        <PlayerCard transform={[{ rotate: '3deg' }]} user={users[7]} />
                        <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} user={users[11]} />
                        <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} transform={[{ rotate: '3deg' }]} user={users[15]} />
                        <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} user={users[19]} />
                        <PlayerCard transform={[{ rotate: '3deg' }]} user={users[23]} />
                        <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} user={users[27]} />
                    </View>

                </View>
                {this.msg()}
            </View>
        );
    }
}
function mapStateToProps(state) {
    const { GameReducer } = state;
    return { GameReducer };
}
export default compose(firestoreConnect(), connect(mapStateToProps))(Lobby);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        margin: '0%',
        padding: '0%',
        justifyContent: 'space-between'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        margin: '0%',
        padding: '0%',
        justifyContent: 'space-between'
    },
    msgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgInnerContainer: {
        width: scale(255.36),
        height: scale(168),
        backgroundColor: '#fff',
        borderRadius: 45,
        borderWidth: 0.5,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
