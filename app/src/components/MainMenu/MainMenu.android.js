import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import KeepAwake from 'react-native-keep-awake';

import PlayerCard from '../PlayerCard/PlayerCard';
import { scale } from '../../utility/Scale';
import Globals from '../../Globals';

const { DATABASE, APP_VERSION } = Globals;

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correctVersion: true
        };
        this.checkAppInfo();
    }

    checkAppInfo = () => {
        firebase
            .firestore()
            .collection("Admin")
            .doc("ApplicationInfo")
            .get()
            .then((doc) => {
                if (doc.data().version !== APP_VERSION) {
                    this.setState({ correctVersion: false });
                    return Linking.openURL('market://details?id=com.doohickey.happyfuntimes');
                }
            })
    }

    signInAnonymously = () => {
        return firebase
            .auth()
            .signInAnonymously()
            .then((user) => {
                console.log('anonymous user: ', user);
                Navigation.showModal({
                    stack: {
                        children: [{
                            component: {
                                name: 'DrawAvatar'
                            }
                        }]
                    }
                });
            });
    }

    createAccount = () => {
        Navigation.showModal({
            component: {
                name: 'Register'
            }
        })
    }

    signIn = () => {
        this.showAd();
        /*Navigation.showModal({
            component: {
                name: 'Login'
            }
        })*/
    }

    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const configUser = await GoogleSignin.configure({
                scopes: ['https://www.googleapis.com/auth/drive.photos.readonly'],
                webClientId: '244044054509-t51ol2lnvb5f3hd7hhr1ifvi4obj439m.apps.googleusercontent.com',
                offlineAccess: false
            });

            await GoogleSignin.signIn().then((user) => {
                console.log('configUser', configUser);
                GoogleSignin.getTokens().then((res) => {
                    console.log(res.accessToken);
                    const creds = firebase.auth.GoogleAuthProvider.credential(user.idToken, res.accessToken);
                    console.log('google creds: ', creds, 'accessToken: ', res.accessToken);
                    firebase
                        .auth()
                        .signInWithCredential(creds)
                        .then((data) => {
                            console.log('google user: ', user);
                            Navigation.showModal({
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'DrawAvatar'
                                        }
                                    }]
                                }
                            });
                        })
                        .catch((err) => {
                            console.log('google signin error: ', err);
                            return Promise.reject(err);
                        });
                })
                    .catch((err) => {
                        console.log('getTokens error: ', err);
                        return Promise.reject(err);
                    });
            });
        } catch (e) {
            console.error(e);
        }
    };

    facebookSignIn = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw new Error('User cancelled request'); // Handle this however fits the flow of your app
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                throw new Error('Something went wrong obtaining the users access token');
            }
            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // login with credential
            const currentUser = await firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then((credData) => {
                    Navigation.showModal({
                        stack: {
                            children: [{
                                component: {
                                    name: 'DrawAvatar'
                                }
                            }]
                        }
                    });
                })
                .catch((err) => {
                    console.log({ logInWithReadPermissionsERR: err });
                });
        } catch (e) {
            console.error(e);
        }
    };

    disconnect = () => {
        const { uid } = firebase.auth().currentUser;
        firebase.auth().signOut().then(() => {
            firebase.database().ref('/status/' + uid)
                .onDisconnect().set({
                    state: 'offline',
                    last_changed: firebase.database.ServerValue.TIMESTAMP
                })
        })
    }

    loadLeaderBoard = () => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'LeaderBoard'
                    }
                }]
            }
        });
    }

    render() {
        let user = undefined;
        if (!this.state.correctVersion) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text>Incorrect version please update</Text>
                </View>
            )
        }
        if (firebase.auth().currentUser) {
            user = { avatarURL: firebase.auth().currentUser.photoURL }
        }

        return (
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer1}>
                    <Text style={styles.innerContainer1Text}>
                        Breath in ... breath out
                      {' '}
                        {'\n'}
                        {' '}
                        ... good ... draw … :)
                    </Text>
                    <TouchableOpacity onPress={this.loadLeaderBoard} style={styles.innerContainer1Right}>
                        <View style={styles.innerContainer1Box}>
                            <View style={styles.innerContainer1BoxInner}>
                                <PlayerCard user={user} style={styles.playerCard} />
                            </View>
                        </View>
                        <Image
                            style={styles.leaderboard}
                            source={require('../../../assets/Leaderboard/round_list_black_24dp.png')}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.signInAnonymously} style={styles.innerContainer2}>
                    <Image
                        style={styles.playButton}
                        source={require('../../../assets/Play/round_play_circle_filled_black_48dp.png')}
                    />
                </TouchableOpacity>

                <View style={styles.innerContainer4}>
                    <TouchableOpacity
                        onPress={this.facebookSignIn}
                        style={styles.innerContainer4Facebook}
                    >
                        <Text style={styles.innerContainer4Text}>f</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.googleSignIn}
                        style={styles.innerContainer4Google}
                    >
                        <Text style={styles.innerContainer4Text}>G</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer6}>
                    <View style={{ ...styles.bar, backgroundColor: "#F3CBFF" }} />
                    <View style={{ ...styles.bar, backgroundColor: "#B2DF6D" }} />
                    <View style={{ ...styles.bar, backgroundColor: "#FFC767" }} />
                    <View style={{ ...styles.bar, backgroundColor: "#94E5FF" }} />
                    <View style={{ ...styles.bar, backgroundColor: "#FFE66A" }} />
                </View>
                <KeepAwake />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        margin: '0%',
        padding: '0%'
    },
    innerContainer1: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer1Right: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    innerContainer1Text: {
        flex: 3,
        flexDirection: 'row',
        color: '#000000',
        fontFamily: 'roboto',
        fontSize: scale(25),
        fontWeight: 'bold',
        paddingBottom: scale(20),
        marginLeft: scale(10)
    },
    innerContainer1Box: {
        flex: 2.5,
        backgroundColor: '#000000',
        borderWidth: scale(4),
        margin: scale(20)
    },
    innerContainer1BoxInner: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '5%'
    },
    playerCard: {
        flex: 1,
        resizeMode: 'contain'
    },
    leaderboard: {
        flex: 3,
        resizeMode: 'contain',
        height: scale(50),
        width: scale(50)
    },
    playButton: {
        flex: 3,
        resizeMode: 'contain',
        height: scale(100),
        width: scale(100)
    },
    innerContainer2: {
        flex: 1.3,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer3: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer3Box: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(4),
        borderRadius: scale(100),
        borderColor: '#000000',
        borderStyle: 'dashed',
        marginTop: scale(30),
        marginBottom: scale(5),
        paddingTop: scale(20),
        paddingBottom: scale(20)
    },
    innerContainer3Text: {
        color: '#000000',
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: scale(40),
        paddingRight: scale(40),
        aspectRatio: 7,
        letterSpacing: scale(1)
    },
    innerContainer4: {
        flex: 1.5,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer4Facebook: {
        flex: 0.14,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(4),
        borderRadius: scale(100),
        borderColor: '#000000',
        borderStyle: 'dashed',
        margin: scale(10),
        aspectRatio: 1,
        marginRight: 40
    },
    innerContainer4Google: {
        flex: 0.14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(4),
        borderRadius: scale(100),
        borderColor: '#000000',
        borderStyle: 'dashed',
        margin: scale(10),
        aspectRatio: 1
    },
    innerContainer4Text: {
        color: 'black',
        fontSize: scale(35),
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '10%'
    },
    innerContainer5: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer5Button: {
        flex: 0.6,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 5,
        borderRadius: scale(100)
    },
    innerContainer5Text: {
        color: '#FFFFFF',
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: scale(1)
    },
    innerContainer6: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: '1%',
        paddingLeft: '27%',
        paddingRight: '27%'
    },
    bar: {
        flex: 1,
        height: '100%',
        width: '30%',
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '33.3%'
    }
});
