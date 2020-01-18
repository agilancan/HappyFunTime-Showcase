import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Globals from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const { DATABASE } = Globals;

class DrawAnswer extends Component {
    uploadAnswer = (path, type) => {
        const { lobbyInfo } = this.props.GameReducer;
        this.props.firebase.storage()
            .ref(DATABASE.LOBBIES)
            .child(lobbyInfo.id)
            .child('answer' + 'type' + '.jpg')
            .putFile(path)
            .then((uploadedFile) => {
                const lobbyRef = this.props.firebase.firestore()
                    .collection(DATABASE.LOBBIES)
                    .doc(lobbyInfo.id);

                if (lobbyInfo.currentA1UID === this.props.firebase.auth().currentUser.uid) {
                    lobbyRef.update({
                        "currentQA.a1": uploadedFile.downloadURL
                    })
                } else {
                    lobbyRef.update({
                        "currentQA.a2": uploadedFile.downloadURL
                    })
                }
            })
    }
    render() {
        const { lobbyInfo } = this.props.GameReducer;
        const { users, minUsers, status, currentQA } = lobbyInfo;
        console.log('drawanswer lobbyInfo', lobbyInfo);
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    justifyContent: 'center',
                    top: scale(16),
                    borderRadius: 50,
                    height: scale(100),
                    width: scale(150),
                    borderWidth: 1,
                    borderColor: '#000'
                }}>
                    <Text style={{ color: '#000', fontSize: scale(16), textAlign: 'center' }}>
                        {lobbyInfo.currentQA.q}
                    </Text>
                </View>
                <View style={{ ...styles.drawCard, overflow: 'visible', marginTop: verticalScale(98) }}>
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
                            if (lobbyInfo.currentA1UID === this.props.firebase.auth().currentUser.uid) {
                                this.uploadAnswer(path, '1');
                            } else {
                                this.uploadAnswer(path, '2');
                            }

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
                    <TouchableOpacity
                        onPress={() => this.sketchRef.save('png', true, 'HFT', 'answer', false, false, false)}
                        style={{
                            ...styles.circleButton,
                            backgroundColor: '#000'
                        }} >
                        <Icon name="play-arrow" size={scale(30)} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontFamily: 'Roboto',
        fontSize: scale(16),
        fontWeight: '500',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
    }
});
