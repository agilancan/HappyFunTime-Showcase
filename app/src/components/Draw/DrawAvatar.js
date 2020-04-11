import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { SketchCanvas } from '@gigasz/react-native-sketch-canvas';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';

import Global from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const { USERS } = Global.DATABASE;

//You draw your avatar here
class DrawAvatar extends Component {
    static options(passProps) {
        return {
            modalPresentationStyle: 'overCurrentContext',
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
        const { currentUser } = firebase.auth();
        firebase.storage()
            .ref(USERS)
            .child(currentUser.uid)
            .child('avatar.jpg')
            .putFile(path)
            .then((uploadedFile) => {
                let { uid, displayName, providerId } = currentUser;
                if (currentUser.providerData.length > 0) {
                    providerId = currentUser.providerData[0].providerId;
                }

                currentUser
                    .updateProfile({
                        photoURL: uploadedFile.downloadURL
                    })
                    .then(() => {
                        const userRef = firebase.firestore()
                            .collection(USERS)
                            .doc(uid);
                        const info = {
                            uid,
                            displayName,
                            status: "online",
                            avatarURL: uploadedFile.downloadURL,
                            currentGameID: undefined,
                            providerId,
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            lastChanged: firebase.firestore.FieldValue.serverTimestamp()
                        }
                        userRef.get().then(doc => {
                            if (doc.exists) {
                                userRef.update(info)
                                    .catch(err => console.log('user profile update error ', err))
                            } else {
                                userRef.set({
                                    ...info,
                                    points: 0,
                                    roundsWon: 0
                                })
                                    .catch(err => console.log('user profile set error ', err))
                            }
                            dispatch({ type: 'SET_GAME_STATE_LOBBY' });
                            Navigation.dismissModal(componentId);
                        })
                    })
                    .catch(err => console.log('auth profile update error ', err))
            })
    }

    render() {
        return (
        <View style={{ ...styles.container, backgroundColor: "green" }}>
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
                                transparent: true,
                                includeImage: false,
                                cropToImageSize: false,
                                imageType: 'png'
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
                        onPress={() => this.sketchRef.save('png', true, 'HFT', 'avatar', false, false, false)}
                        style={{
                            ...styles.circleButton,
                            backgroundColor: '#000'
                        }} >
                        <Icon name="play-arrow" size={scale(30)} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        );
    }
}
export default connect()(DrawAvatar);

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
        borderRadius: 100
    },
    titleText: {
        position: 'absolute',
        top: scale(25.5),
        color: '#000',
        opacity: 0.87,
        fontFamily: Platform.OS === 'ios' ? 'system font' : 'Roboto',
        fontSize: scale(16),
        fontWeight: '500',
        textAlign: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomWidth: 0.5,
        letterSpacing: 2
    }
});

