import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import firebase from 'react-native-firebase';

import Globals from '../../Globals';
import { scale, verticalScale } from '../../utility/Scale';

const { DATABASE } = Globals;

class VoteAnswer extends Component {
    // these methods are not good, use better functions if past alpha
    // issue if rejoin capabilities are involved
    uploadAnswer = (type) => {
        const { lobbyInfo } = this.props.GameReducer;
        const { currentUser } = this.props.firebase.auth();
        if (lobbyInfo.currentA1UID === currentUser.uid ||
            lobbyInfo.currentA2UID === currentUser.uid) {
            return null;
        }

        const index = lobbyInfo.users.findIndex(user => user.uid === currentUser.uid);
        const updateUsers = lobbyInfo.users;
        console.log('voteUser debug', index, updateUsers, lobbyInfo, currentUser.uid);
        updateUsers[index].currentVote = type;
        this.props.firebase.firestore()
            .collection(DATABASE.LOBBIES)
            .doc(lobbyInfo.id)
            .update({
                users: updateUsers
            });
    }
    render() {
        const { users, minUsers, status, currentQA } = this.props.GameReducer.lobbyInfo;
        const user = users.find(user => user.uid === this.props.firebase.auth().currentUser.uid);
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: '#fff',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: scale(16),
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#000'
                }}>
                    <Image style={{
                        height: scale(100),
                        width: scale(100)
                    }}

                        source={{ uri: currentQA.q }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            marginRight: scale(5),
                            borderWidth: user.currentVote === "a1" ? 1 : 0,
                            borderColor: '#000'
                        }}
                        onPress={() => this.uploadAnswer("a1")}>
                        <Image style={{
                            height: scale(100),
                            width: scale(100)
                        }}

                            source={{ uri: currentQA.a1 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#fff',
                        marginLeft: scale(5),
                        borderWidth: user.currentVote === "a2" ? 1 : 0,
                        borderColor: '#000'
                    }} onPress={() => this.uploadAnswer("a2")}>
                        <Image style={{
                            height: scale(100),
                            width: scale(100)
                        }}

                            source={{ uri: currentQA.a2 }} />
                    </TouchableOpacity>
                </View>
            </View >
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
        flex: 1,
        flexDirection: 'column',
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
