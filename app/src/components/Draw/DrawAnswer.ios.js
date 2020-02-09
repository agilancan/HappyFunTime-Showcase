import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, FlatList, Dimensions } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountdownCircle from 'react-native-countdown-circle'

import Globals from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const { DATABASE } = Globals;

class DrawAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWinner: true,
            timer: 30
        }
    }

    componentDidUpdate(prevProps) {
        const { hostUserID, stateTimerStart } = this.props.GameReducer.lobbyInfo;
        let timer = hostUserID === this.props.firebase.auth().currentUser.uid ? 31 : 30;
        if (prevProps.GameReducer.lobbyInfo.stateTimerStart !== stateTimerStart && stateTimerStart !== null) {
            console.log('answer update draw change before', prevProps.GameReducer.lobbyInfo.stateTimerStart, stateTimerStart);
            const startDate = stateTimerStart.toDate();
            const today = new Date();
            const secondsElapsed = (today.getTime() - startDate.getTime()) / 1000;
            timer = timer - secondsElapsed;
            this.setState({ timer });
            console.log('answer update draw change after', startDate, today, secondsElapsed, timer);
        }
    }

    uploadAnswer = (path, type) => {
        const { lobbyInfo } = this.props.GameReducer;
        const { users, hostUserID } = lobbyInfo;
        this.props.firebase.storage()
            .ref(DATABASE.LOBBIES)
            .child(lobbyInfo.id)
            .child('answer' + this.props.firebase.auth().currentUser.uid + '.jpg')
            .putFile(path)
            .then((uploadedFile) => {
                const lobbyRef = this.props.firebase.firestore()
                    .collection(DATABASE.LOBBIES)
                    .doc(lobbyInfo.id);

                const lobbyUserRef = lobbyRef.collection('Users').doc(this.props.firebase.auth().currentUser.uid);

                //const index = users.findIndex(user => user.uid === this.props.firebase.auth().currentUser.uid);
                //users[index] = { ...users[index], votingEnabled: true, currentDrawingURL: uploadedFile.downloadURL };
                if (this.props.firebase.auth().currentUser.uid === hostUserID) {
                    const batch = this.props.firebase.firestore().batch();
                    batch.update(lobbyRef, {
                        startNextState: true,
                        stateTimerStart: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    batch.update(lobbyUserRef, {
                        votingEnabled: true, currentDrawingURL: uploadedFile.downloadURL, currentVote: null
                    })
                    /*lobbyRef.update({
                        users,
                        startNextState: true
                    });*/

                    batch
                        .commit()
                        .then((result) => {
                            console.log('Batch Commit success!', result);
                        })
                        .catch((err) => {
                            console.log('Batch Commit failure:', err);
                        });
                } else {
                    lobbyUserRef.update({
                        votingEnabled: true, currentDrawingURL: uploadedFile.downloadURL
                    })
                    /*lobbyRef.update({
                        users
                    });*/
                }

            })
    }

    uploadNoAnswer = () => {
        const { lobbyInfo } = this.props.GameReducer;
        const { users, hostUserID } = lobbyInfo;
        const lobbyRef = this.props.firebase.firestore()
            .collection(DATABASE.LOBBIES)
            .doc(lobbyInfo.id);
        const lobbyUserRef = lobbyRef.collection('Users').doc(this.props.firebase.auth().currentUser.uid);

        const index = users.findIndex(user => user.uid === this.props.firebase.auth().currentUser.uid);
        users[index] = { ...users[index], votingEnabled: false, interactionEnabled: false, currentDrawingURL: undefined };
        if (this.props.firebase.auth().currentUser.uid === hostUserID) {
            const batch = this.props.firebase.firestore().batch();
            batch.update(lobbyRef, {
                startNextState: true
            });
            batch.update(lobbyUserRef, {
                votingEnabled: true, currentDrawingURL: null, currentVote: null
            })
            /*lobbyRef.update({
                users,
                startNextState: true
            });*/

            batch
                .commit()
                .then((result) => {
                    console.log('Batch Commit success!', result);
                })
                .catch((err) => {
                    console.log('Batch Commit failure:', err);
                });

            /*lobbyRef.update({
                users,
                startNextState: true
            });*/
        } else {
            lobbyUserRef.update({
                votingEnabled: true, currentDrawingURL: null, currentVote: null
            })
            /*lobbyRef.update({
                users
            });*/
        }
    }

    winnerCard = (user, backgroundColor, borderColor, transform) => {
        console.log('vote user', user);
        let bColor = backgroundColor;
        return (
            <View style={{
                ...styles.postedNote,
                backgroundColor: bColor,
                borderColor: this.state.selectedVote === user.uid ? '#000' : borderColor,
                transform
            }} >
                <Image
                    style={{ ...styles.imageNote, transform }}
                    resizeMode={'contain'}
                    source={{ uri: user.avatarURL }} />
            </View>
        );
    }

    renderWinnerItem = ({ item }) => (
        <View>
            {this.winnerCard(item, '#FFC767', '#FFC767', [{ rotate: '0deg' }])}
        </View>
    )

    render() {
        const { lobbyInfo, users } = this.props.GameReducer;

        console.log('drawanswer lobbyInfo', lobbyInfo);
        if (this.state.showWinner && lobbyInfo.winners.length > 0) {
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
                    <Text style={{ fontSize: 16, color: '#000' }}>Winners for last round</Text>
                    <FlatList
                        style={{ flex: 1 }}
                        extraData={this.state}
                        numColumns={4}
                        data={lobbyInfo.winners}
                        keyExtractor={(item) => item.uid}
                        renderItem={this.renderWinnerItem}
                    />
                    <CountdownCircle
                        style={{ position: 'absolute', bottom: 0, left: WINDOW_WIDTH / 2 }}
                        seconds={5}
                        radius={30}
                        borderWidth={8}
                        color="#ff003f"
                        bgColor="#fff"
                        textStyle={{ fontSize: scale(30) }}
                        onTimeElapsed={() => {
                            this.setState({ showWinner: false })
                        }} />
                </ScrollView >
            )
        }
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    justifyContent: 'center',
                    marginVertical: scale(16),
                    borderRadius: 50,
                    height: scale(100),
                    width: scale(150),
                    borderWidth: 1.5,
                    borderColor: '#000'
                }}>
                    <Text style={{ color: '#000', fontSize: scale(16), textAlign: 'center' }}>
                        {lobbyInfo.currentQ}
                    </Text>
                </View>
                <View style={{ ...styles.drawCard, overflow: 'visible' }}>
                    <SketchCanvas
                        ref={(ref) => {
                            if (this.sketchRef === undefined) {
                                this.sketchRef = ref;
                            }
                        }}
                        savePreference={() => {
                            return {
                                folder: 'HFT',
                                filename: "answer",
                                transparent: true,
                                includeImage: false,
                                cropToImageSize: false,
                                imageType: 'png'
                            }
                        }}
                        onSketchSaved={(success, path) => {
                            this.uploadAnswer(path, '1');
                        }}
                        style={styles.drawCard}
                        strokeColor="black"
                        strokeWidth={7}
                    />
                    <Text style={styles.titleText}>DRAW ANSWER</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: verticalScale(511)
                }}>
                    <TouchableOpacity
                        onPress={() => this.sketchRef.undo()}
                        style={{
                            ...styles.circleButton,
                            borderColor: '#000',
                            backgroundColor: '#FFF',
                            marginRight: scale(24)

                        }} >
                        <View style={{
                            ...styles.circleButton,
                            borderWidth: 4,
                            borderStyle: 'dashed'
                        }}>
                            <Icon name="replay" size={scale(30)} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <View
                        onPress={() => {
                            if (this.sketchRef.getPaths().length > 0) {
                                this.sketchRef.save('png', true, 'HFT', 'answer', false, false, false);
                            } else {
                                this.uploadNoAnswer();
                            }
                            //this.sketchRef.save('png', true, 'HFT', 'answer', false, false, false)
                        }}
                        style={{
                            ...styles.circleButton,
                            backgroundColor: '#000'
                        }} >
                        <CountdownCircle
                            seconds={this.state.timer}
                            radius={30}
                            borderWidth={8}
                            color="#ff003f"
                            bgColor="#fff"
                            textStyle={{ fontSize: scale(30) }}
                            onTimeElapsed={() => {
                                if (this.sketchRef.getPaths().length > 0) {
                                    this.sketchRef.save('png', true, 'HFT', 'answer', false, false, false);
                                } else {
                                    this.uploadNoAnswer();
                                }
                            }} />
                        {/*<Icon name="play-arrow" size={scale(30)} color="#FFF" /> */}
                    </View>
                </View>
            </View >
        );

    }
}
function mapStateToProps(state) {
    const { GameReducer } = state;
    return { GameReducer };
}
export default compose(firestoreConnect(), connect(mapStateToProps))(DrawAnswer);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9
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
        //fontFamily: 'Roboto',
        fontSize: scale(16),
        fontWeight: '500',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
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
    }
});
