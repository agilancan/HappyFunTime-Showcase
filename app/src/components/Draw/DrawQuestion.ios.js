import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';

import Globals from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const { DATABASE } = Globals;

class DrawQuestion extends Component {
    uploadQuestion = (path) => {
        const { lobbyInfo } = this.props.GameReducer;
        firebase.storage()
            .ref(DATABASE.LOBBIES)
            .child(lobbyInfo.id)
            .child('question.jpg')
            .putFile(path)
            .then((uploadedFile) => {
                firebase.firestore()
                    .collection(DATABASE.LOBBIES)
                    .doc(lobbyInfo.id)
                    .update({
                        'currentQA.q': uploadedFile.downloadURL,
                        state: 1
                    })
            })
    }
    render() {
        const { users, minUsers, status } = this.props.GameReducer.lobbyInfo;
        return (
            <View style={styles.container}>
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
                                filename: "question",
                                transparent: true,
                                includeImage: false,
                                cropToImageSize: false,
                                imageType: 'png'
                            }
                        }}
                        onSketchSaved={(success, path) => {
                            this.uploadQuestion(path);
                        }}
                        style={styles.drawCard}
                        strokeColor="black"
                        strokeWidth={7}
                    />
                    <Text style={styles.titleText}>DRAW QUESTION</Text>
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
                        onPress={() => this.sketchRef.save('png', true, 'HFT', 'avatar', false, false, false)}
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
export default connect(mapStateToProps)(DrawQuestion);

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
        fontSize: scale(16),
        fontWeight: '500',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
    }
});
