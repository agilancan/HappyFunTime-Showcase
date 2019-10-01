import React from "react";
import { View, Image, Dimensions, Text, Linking, Alert, YellowBox } from "react-native";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';


import MainMenu from "../MainMenu/MainMenu";
import Lobby from '../Lobby/Lobby';
import GLOBAL from '../../Globals';

const { GAMESTATE, DATABASE } = GLOBAL;

class App extends React.Component {
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

    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated'
        ]);
        this.state = {
            overlayType: 'LobbyMsgOverlay'
            //round: 0,
            //lobbyInfo: undefined
        }
        this.lobbyRef = undefined;
    }

    componentDidMount() {
        this.loadUserPersistence();
    }

    componentWillUnmount() {
        if (this.lobbyRef !== undefined) {
            this.lobbyRef();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { GameReducer } = this.props;
        const { gameState } = GameReducer;
        if (this.props.GameReducer.gameState !== nextProps.GameReducer.gameState) {
            if (nextProps.GameReducer.gameState === GAMESTATE.LOBBY) {
                if (this.lobbyRef === undefined) {
                    console.log('gets here')
                    this.findLobby();
                    return true;
                }
            }
        }
        return false;
    }

    loadUserPersistence = () => {
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('onAuthStateChanged user', user);
                const uid = this.props.firebase.auth().currentUser.uid;
                const userStatusDatabaseRef = this.props.firebase.database().ref('/status/' + uid);
                this.props.firebase.database().ref('.info/connected').on('value', (snapshot) => {
                    if (snapshot.val() == false) {
                        return;
                    };
                    userStatusDatabaseRef.onDisconnect().set({
                        state: 'offline',
                        last_changed: firebase.database.ServerValue.TIMESTAMP
                    }).then(() => {
                        userStatusDatabaseRef.set({
                            state: 'online',
                            last_changed: firebase.database.ServerValue.TIMESTAMP
                        });
                    });
                });
            }
        })
    }

    findLobby = () => {
        const { GameReducer } = this.props;
        const { currentUser } = this.props.firebase.auth();
        const lobbiesRef = this.props.firebase.firestore()
            .collection(DATABASE.LOBBIES);

        const updateUserAndStartListener = (ref) => {
            this.props.firebase.firestore()
                .collection(DATABASE.USERS)
                .doc(currentUser.uid)
                .update({
                    currentGameID: ref.id
                })
                .catch(err => console.log('user game id update error ', err))

            this.lobbyRef = lobbiesRef
                .doc(ref.id)
                .onSnapshot(docSnapshot => {
                    this.onLobbyChange(docSnapshot);
                })
        }
        console.log('lobbiesRef ', lobbiesRef);
        lobbiesRef
            .where("status", '==', DATABASE.LOBBY_STATUS.PENDING)
            .limit(1)
            .get()
            .then(snapshot => {
                const user = {
                    uid: currentUser.uid,
                    avatarURL: currentUser.photoURL,
                    inGame: true,
                    questionCount: 0,
                    currentVote: null,
                    points: 0
                };
                console.log('lobby snapshot ', snapshot);
                if (snapshot._docs.length > 0) {
                    lobbiesRef
                        .doc(snapshot._docs[0].id)
                        .update({
                            users: firebase.firestore.FieldValue.arrayUnion(user)
                        })
                        .then(ref => {
                            updateUserAndStartListener(snapshot._docs[0])
                        })
                        .catch(err => console.log('join lobby error ', err))
                } else {
                    lobbiesRef
                        .add({
                            users: [user],
                            hostUserID: currentUser.uid,
                            minUsers: DATABASE.LOBBY_MIN_USERS,
                            currentQA: { q: undefined, a1: undefined, a2: undefined },
                            currentQUID: undefined,
                            currentA1UID: undefined,
                            currentA2UID: undefined,
                            QAList: [],
                            status: DATABASE.LOBBY_STATUS.PENDING,
                            round: 0,
                            state: 0
                        })
                        .then(ref => {
                            updateUserAndStartListener(ref)
                        })
                        .catch(err => console.log('add lobby error ', err))
                }
            })
            .catch(err => console.log('get lobby error ', err))
    }

    chooseRandomInGameUser = (lobbyInfo, users, excludedUsers = []) => {
        const inGameUsers = users.filter(user => { return user.inGame && !excludedUsers.includes(user.uid) });
        const inGameIndex = Math.floor(Math.random() * inGameUsers.length);
        return inGameUsers[inGameIndex];
    }

    onLobbyChange = (snapshot) => {
        const { GameReducer } = this.props;
        const lobbyInfo = snapshot.data();


        const info = { ...lobbyInfo, id: snapshot.id };
        this.props.dispatch({ type: 'SET_LOBBY_INFO', lobbyInfo: info });

        if (lobbyInfo.hostUserID === this.props.firebase.auth().currentUser.uid) {
            const lobbyRef = this.props.firebase.firestore()
                .collection(DATABASE.LOBBIES)
                .doc(snapshot.id);
            //This starts the game
            if (lobbyInfo.status === DATABASE.LOBBY_STATUS.PENDING &&
                lobbyInfo.minUsers <= lobbyInfo.users.length) {
                const chosenQUser = this.chooseRandomInGameUser(lobbyInfo, lobbyInfo.users);
                const chosenA1User = this.chooseRandomInGameUser(lobbyInfo, lobbyInfo.users, [chosenQUser.uid]);
                const chosenA2User = this.chooseRandomInGameUser(lobbyInfo, lobbyInfo.users, [chosenQUser.uid, chosenA1User.uid]);
                lobbyRef
                    .update({
                        status: DATABASE.LOBBY_STATUS.IN_PROGRESS,
                        currentQUID: chosenQUser.uid,
                        currentA1UID: chosenA1User.uid,
                        currentA2UID: chosenA2User.uid
                    })
                    .catch(err => console.log('game start send error', err))
            }

            //if votes match user count then start next round
            //does not check for dropped users, change for later
            if (lobbyInfo.status === DATABASE.LOBBY_STATUS.IN_PROGRESS &&
                GameReducer.lobbyInfo.users !== lobbyInfo.users) {

                let a1Votes = 0;
                let a2Votes = 0;

                lobbyInfo.users.forEach(user => {
                    if (user.currentVote === "a1") {
                        a1Votes++;
                    } else if (user.currentVote === "a2") {
                        a2Votes++;
                    }
                });
                console.log('user change', a1Votes, a2Votes, lobbyInfo, a1Votes + a2Votes >= lobbyInfo.users.length - 3);
                if (a1Votes + a2Votes >= lobbyInfo.users.length - 3) {
                    const chosenQUser = this.chooseRandomInGameUser(lobbyInfo, lobbyInfo.users);
                    const chosenA1User = this.chooseRandomInGameUser(lobbyInfo, lobbyInfo.users, [chosenQUser.uid]);
                    const chosenA2User = this.chooseRandomInGameUser(lobbyInfo, lobbyInfo.users, [chosenQUser.uid, chosenA1User.uid]);
                    const updateUsers = lobbyInfo.users;
                    const a1Index = lobbyInfo.users.findIndex((user) => user.uid === lobbyInfo.currentA1UID);
                    const a2Index = lobbyInfo.users.findIndex((user) => user.uid === lobbyInfo.currentA2UID);
                    updateUsers[a1Index].points = a1Votes;
                    updateUsers[a2Index].points = a2Votes;
                    if (a1Votes > a2Votes) {
                        updateUsers[a2Index].inGame = false;
                    } else if (a1Votes < a2Votes) {
                        updateUsers[a1Index].inGame = false;
                    }
                    lobbyInfo.users.forEach((element, index, array) => {
                        updateUsers[index].currentVote = null;
                    });
                    lobbyRef.update({
                        users: updateUsers,
                        currentQUID: chosenQUser.uid,
                        currentA1UID: chosenA1User.uid,
                        currentA2UID: chosenA2User.uid,
                        state: 0,
                        round: lobbyInfo.round + 1,
                        currentQA: {
                            a1: undefined,
                            a2: undefined,
                            q: undefined
                        }
                    })
                }
            }
        }


        if (lobbyInfo.state === 0) { //drawing question
            if (lobbyInfo.status === DATABASE.LOBBY_STATUS.IN_PROGRESS &&
                lobbyInfo.currentQUID === this.props.firebase.auth().currentUser.uid &&
                this.state.overlayType !== 'DrawQuestion') {
                this.setState({ overlayType: 'DrawQuestion' })
                Navigation.dismissOverlay(this.props.componentId);
                this.currentOverLay = 'DrawQuestion';
                Navigation.showOverlay({
                    component: {
                        name: 'DrawQuestion',
                        id: 'DrawQuestion',
                        options: {
                            overlay: {
                                interceptTouchOutside: true
                            }
                        }
                    }
                });
            }
        } else if (lobbyInfo.state === 1) { //drawing answers
            console.log('state 1 info', lobbyInfo, this.props.firebase.auth().currentUser, this.currentOverLay);
            if (lobbyInfo.currentA1UID === this.props.firebase.auth().currentUser.uid ||
                lobbyInfo.currentA2UID === this.props.firebase.auth().currentUser.uid) {
                if (lobbyInfo.currentQA.a1 === null &&
                    lobbyInfo.currentA1UID === this.props.firebase.auth().currentUser.uid
                ) {
                    Navigation.dismissOverlay(this.currentOverLay);
                    this.currentOverLay = 'DrawAnswer';
                    Navigation.showOverlay({
                        component: {
                            name: 'DrawAnswer',
                            id: 'DrawAnswer',
                            options: {
                                overlay: {
                                    interceptTouchOutside: true
                                }
                            }
                        }
                    });
                } else if (lobbyInfo.currentQA.a2 === null &&
                    lobbyInfo.currentA2UID === this.props.firebase.auth().currentUser.uid) {
                    Navigation.dismissOverlay(this.currentOverLay);
                    this.currentOverLay = 'DrawAnswer';
                    Navigation.showOverlay({
                        component: {
                            name: 'DrawAnswer',
                            id: 'DrawAnswer',
                            options: {
                                overlay: {
                                    interceptTouchOutside: true
                                }
                            }
                        }
                    });
                } else if (this.currentOverLay !== 'VoteAnswer') {
                    Navigation.dismissOverlay(this.currentOverLay);
                    this.currentOverLay = 'VoteAnswer';
                    Navigation.showOverlay({
                        component: {
                            name: 'VoteAnswer',
                            id: 'VoteAnswer',
                            options: {
                                overlay: {
                                    interceptTouchOutside: true
                                }
                            }
                        }
                    });
                }
            } else {
                if (this.currentOverLay !== 'VoteAnswer') {
                    Navigation.dismissOverlay(this.currentOverLay);
                    this.currentOverLay = 'VoteAnswer';
                    Navigation.showOverlay({
                        component: {
                            name: 'VoteAnswer',
                            id: 'VoteAnswer',
                            options: {
                                overlay: {
                                    interceptTouchOutside: true
                                }
                            }
                        }
                    });
                }
            }
        } else if (lobbyInfo.state === 2) { //voting then next round, reset state here    
        }



    }

    render() {
        const { GameReducer } = this.props;
        const { gameState } = GameReducer;
        switch (gameState) {
            case GAMESTATE.LOGIN:
                return (<MainMenu />);
            case GAMESTATE.LOBBY:
                return (<Lobby />)
            default:
                return null;
        }

    }
}
function mapStateToProps(state) {
    const { GameReducer } = state;
    return { GameReducer };
}
export default compose(firestoreConnect(), connect(mapStateToProps))(App);
