import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import Global from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const { USERS } = Global.DATABASE;

//You draw your avatar here
class DrawAvatar extends Component {
    static options(passProps) {
        return {
            statusBar: {
                backgroundColor: "transparent",
                drawBehind: true,
                visible: false,
                style: "dark"
            },
            topBar: {
                visible: false,
                drawBehind: true,
                animate: false
            },
            passProps
        };
    }

    enterLobby = (path) => {
        const { dispatch, componentId } = this.props;
        const { currentUser } = this.props.firebase.auth();
        this.props.firebase.storage()
            .ref(USERS)
            .child(currentUser.uid)
            .child('avatar.jpg')
            .putFile(path)
            .then((uploadedFile) => {
                const { uid, displayName, pictureURL } = currentUser;
                currentUser
                    .updateProfile({
                        photoURL: uploadedFile.downloadURL
                    })
                    .then(() => {
                        this.props.firebase.firestore()
                            .collection(USERS)
                            .doc(uid)
                            .set({
                                uid,
                                displayName,
                                online: true,
                                avatarURL: uploadedFile.downloadURL,
                                currentGameID: undefined
                            })
                            .catch(err => console.log('user profile update error ', err))
                        dispatch({ type: 'SET_GAME_STATE_LOBBY' });
                        Navigation.dismissModal(componentId);
                    })
                    .catch(err => console.log('auth profile update error ', err))
            })
    }

    render() {
        return (
            <View style={{ ...styles.container, backgroundColor: "green" }}>
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
                                filename: "avatar",
                                transparent: false,
                                includeImage: false,
                                cropToImageSize: false,
                                imageType: 'jpg'
                            }
                        }}
                        onSketchSaved={(success, path) => {
                            this.enterLobby(path);
                        }}
                        style={styles.drawCard}
                        strokeColor="black"
                        strokeWidth={7}
                    />
                    <Text style={styles.titleText}>DRAW YOURSELF</Text>
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
                        onPress={() => this.sketchRef.save('jpg', false, 'HFT', 'avatar', false, false, false)}
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
export default compose(firestoreConnect(), connect())(DrawAvatar);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center"
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

