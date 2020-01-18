import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, FlatList, ToastAndroid } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CountdownCircle from 'react-native-countdown-circle'

import firebase from 'react-native-firebase';

import PlayerCard from "../PlayerCard/PlayerCard";
import Globals from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const { DATABASE } = Globals;

class VoteAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVote: undefined
        };
    }

    uploadVote = () => {
        const { lobbyInfo } = this.props.GameReducer;
        const lobbyRef = this.props.firebase.firestore()
            .collection(DATABASE.LOBBIES)
            .doc(lobbyInfo.id);
        const { users, hostUserID } = lobbyInfo;
        const index = users.findIndex(user => user.uid === this.props.firebase.auth().currentUser.uid);
        if (this.state.selectedVote !== undefined) {
            users[index] = { ...users[index], interactionEnabled: true, currentVote: this.state.selectedVote };
        } else {
            users[index] = { ...users[index], interactionEnabled: false, currentVote: null };
        }
        if (this.props.firebase.auth().currentUser.uid === hostUserID) {
            lobbyRef.update({
                users,
                startNextState: true
            });
        } else {
            lobbyRef.update({
                users
            });
        }
    }


    voteCard = (user, backgroundColor, borderColor, transform) => {
        console.log('vote user', user);
        let bColor = backgroundColor;
        if (user !== undefined) {
            if (!user.inGame) {
                bColor = '#FF0000';
            }
        }
        return (
            <View style={{
                ...styles.postedNote,
                backgroundColor: bColor,
                borderColor: this.state.selectedVote === user.uid ? '#000' : borderColor,
                transform
            }} >
                {user !== undefined ? <Image
                    style={{ ...styles.imageNote, transform }}
                    resizeMode={'contain'}
                    source={{ uri: user.currentDrawingURL }} /> : null}
            </View>
        );
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { this.setState({ selectedVote: item.uid }) }}>
            {this.voteCard(item, '#FFC767', '#FFC767', [{ rotate: '0deg' }])}
        </TouchableOpacity>
    )
    render() {
        const { users, minUsers, status, currentQA, hostUserID } = this.props.GameReducer.lobbyInfo;
        console.log('voteUsers', users);
        const timer = hostUserID === this.props.firebase.auth().currentUser.uid ? 15 : 15;
        return (
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                style={{
                    backgroundColor: '#fff',
                    opacity: 1,
                    position: 'absolute',
                    alignSelf: 'center',
                    flexDirection: 'column',
                    height: WINDOW_HEIGHT,
                    width: WINDOW_WIDTH - 16
                }} >
                <FlatList
                    style={{ flex: 1 }}
                    extraData={this.state}
                    numColumns={4}
                    data={users.filter(user => user.currentDrawingURL !== null && user.uid !== this.props.firebase.auth().currentUser.uid)}
                    keyExtractor={(item) => item.uid}
                    renderItem={this.renderItem}
                />
                <CountdownCircle
                    style={{ position: 'absolute', bottom: 0, left: WINDOW_WIDTH / 2 }}
                    seconds={timer}
                    radius={30}
                    borderWidth={8}
                    color="#ff003f"
                    bgColor="#fff"
                    textStyle={{ fontSize: scale(30) }}
                    onTimeElapsed={() => { this.uploadVote() }} />
            </ScrollView >
        );

    }
}
function mapStateToProps(state) {
    const { GameReducer } = state;
    return { GameReducer };
}
export default compose(firestoreConnect(), connect(mapStateToProps))(VoteAnswer);

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        backgroundColor: '#fff',
        height: WINDOW_HEIGHT - 16,
        width: WINDOW_WIDTH - 16,
        position: 'absolute',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    },
    innerContainer: {
        width: scale(255.36),
        height: scale(168),
        backgroundColor: '#fff',
        borderRadius: 45,
        borderWidth: 0.5,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleButton: {
        width: scale(57),
        height: scale(57),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(30)
    },
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
        //position: 'absolute',
        height: scale(80),
        width: scale(80)
    },
    drawCard: {
        backgroundColor: "white",
        alignItems: "center",
        height: verticalScale(441.86),
        width: scale(344.38),
        borderRadius: 7
    },
    titleText: {
        position: 'absolute',
        top: scale(25.5),
        color: '#000',
        opacity: 0.87,
        fontFamily: 'Roboto',
        fontSize: scale(16),
        fontWeight: '500',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
    }
});
