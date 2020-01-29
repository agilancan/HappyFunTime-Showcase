const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./happyfuntimes-28813-3a26185f7393.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://happyfuntimes-28813.firebaseio.com"
});

const QUESTIONS = [
    'Serious goldfish out for vengence',
    'A tree knocking on wood',
    'Pencil at a crime scene',
    'Morning face',
    'Night time scary things',
    'Cheese robbing a mouse',
    'A humble whale fishing',
    'Confused duck in the desert',
    'Caterpillar having an existential crisis'
]

exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate(
    async (change, context) => {
        const eventStatus = change.after.val();

        const userStatusFirestoreRef = admin.firestore().doc(`Users/${context.params.uid}`);

        const statusSnapshot = await change.after.ref.once('value');
        const status = statusSnapshot.val();
        console.log(status, eventStatus);

        if (status.last_changed > eventStatus.last_changed) {
            return null;
        }
        eventStatus.last_changed = new Date(eventStatus.last_changed);
        return userStatusFirestoreRef.update({ status: eventStatus.state });
    });

exports.onUserInfoChanged = functions.firestore.document('Users/{uid}')
    .onUpdate((change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const { params } = context;

        if (beforeData.status !== afterData.status) {
            if (afterData.status === "online") {

            } else {
                if (afterData.currentGameID !== null) {
                    const lobbyRef = admin.firestore().collection('Lobbies').doc(afterData.currentGameID);
                    const userLobbyRef = lobbyRef.collection('Users').doc(params.uid);
                    return lobbyRef.get()
                        .then(doc => {
                            const batch = admin.firestore().batch();
                            const index = doc.data().users.findIndex(
                                (element) => { return element.uid === params.uid })
                            let inGameUsers = [];
                            if (doc.data().users.length > 1) {
                                inGameUsers = doc.data().users.splice(index, 1);
                            }
                            console.log('users', doc.data().users, 'inGameUsers', inGameUsers);
                            if (doc.data().status === "Pending") {
                                if (inGameUsers.length < 1) {
                                    batch.update(lobbyRef, {
                                        hostUserID: null,
                                        users: inGameUsers
                                    });
                                } else {
                                    if (doc.data().hostUserID === params.uid) {
                                        batch.update(lobbyRef, {
                                            users: inGameUsers,
                                            hostUserID: inGameUsers[0].uid
                                        });
                                    } else {
                                        batch.update(lobbyRef, {
                                            users: inGameUsers
                                        });
                                    }
                                }
                            } else {
                                if (doc.data().hostUserID === params.uid) {
                                    if (inGameUsers.length < 1) {
                                        batch.update(lobbyRef, {
                                            users: inGameUsers,
                                            hostUserID: null,
                                            status: 'Pending'
                                        });
                                    } else if (inGameUsers.length < 2) {
                                        batch.update(lobbyRef, {
                                            users: inGameUsers,
                                            hostUserID: inGameUsers[0].uid,
                                            status: 'Pending'
                                        });
                                    } else {
                                        batch.update(lobbyRef, {
                                            users: inGameUsers,
                                            hostUserID: inGameUsers[0].uid
                                        });
                                    }
                                } else {
                                    batch.update(lobbyRef, {
                                        users: inGameUsers
                                    });
                                }
                            }

                            batch.delete(userLobbyRef);
                            const userRef = admin.firestore().collection('Users').doc(params.uid);
                            batch.update(userRef, {
                                currentGameID: null
                            });

                            return batch
                                .commit()
                                .then((result) => {
                                    console.log('user game remove Batch Commit success!: ', result);
                                })
                                .catch((error) => {
                                    console.log('user game remove Batch Commit error!: ', error);
                                });
                        })
                        .catch(err => console.log('lobby get error', err))
                }
                return true;
            }
        }
    })

exports.onLobbyInfoChanged = functions.firestore.document('Lobbies/{lobbyID}')
    .onUpdate((change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const { params } = context;

        const lobbyRef = admin.firestore().collection('Lobbies').doc(params.lobbyID);
        const lobbyUsersRef = lobbyRef.collection('Users');

        if (afterData.startNextState) {
            let state = afterData.state;
            if (afterData.state < 2) {
                state = state + 1;
                lobbyRef.update({
                    startNextState: false,
                    state
                })
            } else {
                state = 1;
                const questionIndex = Math.floor(Math.random() * QUESTIONS.length);
                const currentQ = QUESTIONS[questionIndex];
                const batch = admin.firestore().batch();
                afterData.users.forEach(user => {
                    const userRef = lobbyUsersRef.doc(user.uid);
                    batch.update(userRef, {
                        currentVote: null
                    })
                })
                batch.update(lobbyRef, {
                    startNextState: false,
                    state,
                    currentQ
                })
                batch
                    .commit()
                    .then((result) => {
                        console.log('lobby update Batch Commit success!: ', result);
                    })
                    .catch((error) => {
                        console.log('lobby update Batch Commit error!: ', error);
                    });
            }
        }
        if (afterData.hostUserID === null && afterData.users.length > 0) {
            admin.firestore().collection('Lobbies').doc(params.lobbyID)
                .update({
                    hostUserID: afterData.users[0].uid
                })
                .catch(err => console.log('lobby update error', err))
        }
        return true
    })
