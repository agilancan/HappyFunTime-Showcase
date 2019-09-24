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
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated'
        ]);
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
                const isOfflineForDatabase = {
                    state: 'offline',
                    last_changed: firebase.database.ServerValue.TIMESTAMP
                };

                const isOnlineForDatabase = {
                    state: 'online',
                    last_changed: firebase.database.ServerValue.TIMESTAMP
                };
                this.props.firebase.database().ref('.info/connected').on('value', (snapshot) => {
                    if (snapshot.val() == false) {
                        return;
                    };
                    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        userStatusDatabaseRef.set(isOnlineForDatabase);
                    });
                });
            }
        })
    }

    findLobby = () => {
        const { currentUser } = this.props.firebase.auth();
        const lobbiesRef = this.props.firebase.firestore()
            .collection(DATABASE.LOBBIES);
        lobbiesRef
            .where("status", '==', DATABASE.LOBBY_STATUS.PENDING)
            .limit(1)
            .get()
            .then(snapshot => {
                if (snapshot.length > 0) {
                    //snapshot[0].doc.id
                    //Add user to existing lobby here
                } else {
                    lobbiesRef
                        .add({
                            users: [],
                            hostUserID: currentUser.uid,
                            minUsers: DATABASE.LOBBY_MIN_USERS,
                            currentQuestion: undefined,
                            questions: [],
                            status: DATABASE.LOBBY_STATUS.PENDING
                        })
                        .then(ref => {
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
                        })
                        .catch(err => console.log('add lobby error ', err))
                }
            })
            .catch(err => console.log('get lobby error ', err))
    }

    onLobbyChange = (snapshot) => {
        console.log('lobby snapshot ', snapshot);
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
