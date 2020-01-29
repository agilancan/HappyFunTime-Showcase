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
        const lobbyUsersRef = lobbyRef.collection('Users');
        const { users, hostUserID } = lobbyInfo;
        const index = users.findIndex(user => user.uid === this.props.firebase.auth().currentUser.uid);
        if (this.state.selectedVote !== undefined) {
            users[index] = { ...users[index], interactionEnabled: true, currentVote: this.state.selectedVote };
        } else {
            users[index] = { ...users[index], interactionEnabled: false, currentVote: null };
        }
        if (this.props.firebase.auth().currentUser.uid === hostUserID) {
            lobbyUsersRef.get()
                .then(snapshot => {
                    const batch = this.props.firebase.firestore().batch();
                    const roundVotes = [];
                    let mostPoints = 0;
                    snapshot.forEach((doc) => {
                        if (doc.data().currentVote !== null) {
                            const index = roundVotes.findIndex(vote => vote.uid === doc.data().currentVote);
                            if (index === -1) {
                                roundVotes.push({ uid: doc.data().currentVote, points: 1, avatarURL: doc.data().avatarURL })
                                if (mostPoints === 0) {
                                    mostPoints = 1;
                                }
                            } else {
                                roundVotes[index].points = roundVotes[index].points + 1;
                                if (mostPoints < roundVotes[index].points) {
                                    mostPoints = roundVotes[index].points;
                                }
                            }
                            const userVoteRef = lobbyUsersRef.doc(doc.data().currentVote);
                            batch.update(userVoteRef, {
                                points: firebase.firestore.FieldValue.increment(1)
                            })
                        }
                    });
                    const winners = [];
                    if (mostPoints > 0) {
                        roundVotes.forEach(roundVote => {
                            if (mostPoints === roundVote.points) {
                                winners.push(roundVote)
                            }
                        })
                    }
                    winners.forEach(winner => {
                        batch.update(lobbyUsersRef.doc(winner.uid), {
                            roundsWon: firebase.firestore.FieldValue.increment(1)
                        });
                    })
                    batch.update(lobbyRef, {
                        startNextState: true,
                        winners
                    });
                    batch
                        .commit()
                        .then((result) => {
                            console.log('Batch Commit success!', result);
                        })
                        .catch((err) => {
                            console.log('Batch Commit failure:', err);
                        });
                })

        }
    }

    uploadQuickVote = (currentVote) => {
        const { lobbyInfo } = this.props.GameReducer;
        const lobbyRef = this.props.firebase.firestore()
            .collection(DATABASE.LOBBIES)
            .doc(lobbyInfo.id);
        lobbyRef.collection('Users').doc(this.props.firebase.auth().currentUser.uid)
            .update({
                currentVote
            })
    }


    voteCard = (user, backgroundColor, borderColor, transform) => {
        console.log('vote user', user);
        let bColor = backgroundColor;
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
        <TouchableOpacity onPress={() => {
            this.setState({ selectedVote: item.uid })
            this.uploadQuickVote(item.uid)
        }}>
            {this.voteCard(item, '#FFC767', '#FFC767', [{ rotate: '0deg' }])}
        </TouchableOpacity>
    )
    render() {
        const { users, lobbyInfo } = this.props.GameReducer;
        const { minUsers, status, currentQA, hostUserID } = lobbyInfo;
        console.log('voteUsers', users);
        const timer = hostUserID === this.props.firebase.auth().currentUser.uid ? 15 : 15;
        return (
            <ScrollView
                contentContainerStyle={{
                    marginTop: 100,
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
                <Text style={{ fontSize: 16, color: '#000' }}>Tap to vote for the best picture</Text>
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
