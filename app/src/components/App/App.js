import React from "react";
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import MainMenu from "../MainMenu/MainMenu";
import Lobby from '../Lobby/Lobby';
import GLOBAL from '../../Globals';

const { GAMESTATE, DATABASE } = GLOBAL;

const advert = firebase.admob().interstitial('ca-app-pub-8552251867519242/6963160064');

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
        if (this.userRef !== undefined) {
            this.userRef();
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
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const uid = firebase.auth().currentUser.uid;
                const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
                firebase.database().ref('.info/connected').on('value', (snapshot) => {
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
        const { currentUser } = firebase.auth();
        const lobbiesRef = firebase.firestore()
            .collection(DATABASE.LOBBIES);

        const updateUserAndStartListener = (ref) => {
            firebase.firestore()
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
            this.userRef = lobbiesRef
                .doc(ref.id)
                .collection('Users')
                .onSnapshot(dataSnapshot => {
                    let data = [...this.props.GameReducer.users];
                    dataSnapshot.docChanges.forEach((change) => {
                        if (change.type === 'added') {
                            data = [change.doc.data(), ...data];
                        }
                        if (change.type === 'modified') {
                            const index = data.findIndex((user) => user.uid === change.doc.data().uid);
                            data.splice(index, 1);
                            data = [change.doc.data(), ...data];
                        }
                        if (change.type === 'removed') {
                            const index = data.findIndex((user) => user.uid === change.doc.data().uid);
                            data.splice(index, 1);
                        }
                    })
                    const users = data.sort((a, b) => {
                        return a.roundsWon < b.roundsWon;
                    });
                    this.props.dispatch({
                        type: 'SET_USERS',
                        users
                    });
                    //this.onLobbyChange(docSnapshot);
                })
        }

        const addUser = (ref, user) => {
            firebase.firestore()
                .collection(DATABASE.LOBBIES)
                .doc(ref.id)
                .collection('Users')
                .doc(user.uid)
                .set(user)
                .catch(err => console.log('user add error ', err))
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
                    votingEnabled: false,
                    interactionEnabled: false,
                    currentDrawingURL: undefined,
                    currentVote: null,
                    rank: 0,
                    points: 0,
                    roundsWon: 0
                };
                console.log('lobby snapshot ', snapshot);
                if (snapshot._docs.length > 0) {
                    lobbiesRef
                        .doc(snapshot._docs[0].id)
                        .update({
                            users: firebase.firestore.FieldValue.arrayUnion({ uid: currentUser.uid })
                        })
                        .then(ref => {
                            updateUserAndStartListener(snapshot._docs[0])
                            addUser(snapshot._docs[0], user)
                        })
                        .catch(err => console.log('join lobby error ', err))
                } else {
                    lobbiesRef
                        .where("status", '==', DATABASE.LOBBY_STATUS.IN_PROGRESS)
                        .limit(1)
                        .get()
                        .then(lobbySnapshot => {
                            if (lobbySnapshot._docs.length > 0) {
                                lobbiesRef
                                    .doc(lobbySnapshot._docs[0].id)
                                    .update({
                                        users: firebase.firestore.FieldValue.arrayUnion({ uid: currentUser.uid })
                                    })
                                    .then(ref => {
                                        updateUserAndStartListener(lobbySnapshot._docs[0])
                                        addUser(lobbySnapshot._docs[0], user)
                                    })
                                    .catch(err => console.log('join inProgress lobby error ', err))
                            } else {
                                const questionIndex = Math.floor(Math.random() * GLOBAL.QUESTIONS.length);
                                const question = GLOBAL.QUESTIONS[questionIndex];
                                lobbiesRef
                                    .add({
                                        users: [{ uid: currentUser.uid }],
                                        hostUserID: currentUser.uid,
                                        minUsers: DATABASE.LOBBY_MIN_USERS,
                                        currentQ: question,
                                        status: DATABASE.LOBBY_STATUS.PENDING,
                                        round: 0,
                                        state: 0,
                                        startNextState: false,
                                        winners: [],
                                        stateTimerStart: firebase.firestore.FieldValue.serverTimestamp()
                                    })
                                    .then(ref => {
                                        updateUserAndStartListener(ref)
                                        addUser(ref, user)
                                    })
                                    .catch(err => console.log('add lobby error ', err))
                            }
                        })
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

        if (lobbyInfo.hostUserID === firebase.auth().currentUser.uid) {
            const lobbyRef = firebase.firestore()
                .collection(DATABASE.LOBBIES)
                .doc(snapshot.id);
            //This starts the game
            if (lobbyInfo.status === DATABASE.LOBBY_STATUS.PENDING &&
                lobbyInfo.minUsers <= lobbyInfo.users.length) {
                const questionIndex = Math.floor(Math.random() * GLOBAL.QUESTIONS.length);
                const question = GLOBAL.QUESTIONS[questionIndex];
                lobbyRef
                    .update({
                        status: DATABASE.LOBBY_STATUS.IN_PROGRESS,
                        currentQ: question,
                        state: 1
                    })
                    .catch(err => console.log('game start send error', err))
            }
        }

        if (lobbyInfo.state === 1) // drawing phase 
        {


        }
        else if (lobbyInfo.state === 2) {
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
export default connect(mapStateToProps)(App);
