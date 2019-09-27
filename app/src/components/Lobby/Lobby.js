import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PlayerCard from "../PlayerCard/PlayerCard";

class Lobby extends Component {
    render() {
        const { lobbyInfo } = this.props.GameReducer;
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <PlayerCard transform={[{ rotate: '3deg' }]} user={lobbyInfo.users[0]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={lobbyInfo.users[1]} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} user={lobbyInfo.users[2]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} user={lobbyInfo.users[3]} />
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} transform={[{ rotate: '3deg' }]} user={lobbyInfo.users[4]} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} user={lobbyInfo.users[5]} />
                    <PlayerCard transform={[{ rotate: '3deg' }]} user={lobbyInfo.users[6]} />
                </View>
                <View style={styles.innerContainer}>
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                </View>
                <View style={styles.innerContainer}>
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} transform={[{ rotate: '3deg' }]} />
                </View>
                <View style={styles.innerContainer}>
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} />
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#FFE66A'} backgroundColor={'#FFE66A'} />
                    <PlayerCard borderColor={'#FFC767'} backgroundColor={'#FFC767'} transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#F3CBFF'} backgroundColor={'#F3CBFF'} />
                    <PlayerCard transform={[{ rotate: '3deg' }]} />
                    <PlayerCard borderColor={'#B2DF6D'} backgroundColor={'#B2DF6D'} />
                </View>
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
    }
});
