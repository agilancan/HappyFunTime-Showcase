import React from "react";
import { YellowBox } from "react-native";
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
                    votingEnabled: false,
                    interactionEnabled: false,
                    currentDrawingURL: undefined,
                    currentVote: null,
                    rank: 0,
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
                        .where("status", '==', DATABASE.LOBBY_STATUS.IN_PROGRESS)
                        .limit(1)
                        .get()
                        .then(lobbySnapshot => {
                            if (lobbySnapshot._docs.length > 0) {
                                lobbiesRef
                                    .doc(lobbySnapshot._docs[0].id)
                                    .update({
                                        users: firebase.firestore.FieldValue.arrayUnion(user)
                                    })
                                    .then(ref => {
                                        updateUserAndStartListener(lobbySnapshot._docs[0])
                                    })
                                    .catch(err => console.log('join inProgress lobby error ', err))
                            } else {
                                const questionIndex = Math.floor(Math.random() * GLOBAL.QUESTIONS.length);
                                const question = GLOBAL.QUESTIONS[questionIndex];
                                lobbiesRef
                                    .add({
                                        users: [user],
                                        hostUserID: currentUser.uid,
                                        minUsers: DATABASE.LOBBY_MIN_USERS,
                                        currentQ: question,
                                        status: DATABASE.LOBBY_STATUS.PENDING,
                                        round: 0,
                                        state: 0,
                                        startNextState: false
                                    })
                                    .then(ref => {
                                        updateUserAndStartListener(ref)
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

        if (lobbyInfo.hostUserID === this.props.firebase.auth().currentUser.uid) {
            const lobbyRef = this.props.firebase.firestore()
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
export default compose(firestoreConnect(), connect(mapStateToProps))(App);
