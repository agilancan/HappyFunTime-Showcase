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
                    console.log('after lobby user data', afterData, 'before lobby user data', beforeData);
                    lobbyRef.get()
                        .then(doc => {
                            const batch = admin.firestore().batch();
                            console.log('lobby doc', doc.data(), doc.data().hostUserID !== params.uid, params);
                            if (doc.data().status === "Pending") {
                                if (doc.data().users.length < 2) {
                                    batch.delete(lobbyRef);
                                } else {
                                    const index = doc.data().users.findIndex(
                                        (element) => { return element.uid === params.uid })
                                    const inGameUsers = doc.data().users.splice(index, 1);
                                    if (doc.data().hostUserID !== params.uid) {
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
                                if (doc.data().hostUserID !== params.uid) {
                                    const index = doc.data().users.findIndex(
                                        (element) => { return element.uid === params.uid })
                                    const tempUsers = doc.data().users;
                                    tempUsers[index] = { ...tempUsers[index], inGame: false }
                                    const inGameUsers = tempUsers.filter(user => user.inGame);
                                    if (inGameUsers.length <= 1) {
                                        batch.update(lobbyRef, {
                                            users: tempUsers,
                                            hostUserID: null,
                                            status: 'FinishedNoPlayers'
                                        });
                                    } else {
                                        batch.update(lobbyRef, {
                                            users: tempUsers,
                                            hostUserID: inGameUsers[0].uid
                                        });
                                    }
                                } else {
                                    const index = doc.data().users.findIndex(
                                        (element) => { return element.uid === params.uid })
                                    const tempUsers = doc.data().users;
                                    tempUsers[index] = { ...tempUsers[index], inGame: false }
                                    batch.update(lobbyRef, {
                                        users: tempUsers
                                    });
                                }
                            }

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

        if (afterData.startNextState) {
            let state = afterData.state;
            if (afterData.state < 2) {
                state = state + 1;
                admin.firestore().collection('Lobbies').doc(params.lobbyID)
                    .update({
                        startNextState: false,
                        state
                    })
                    .catch(err => console.log('lobby update error', err))
            } else {
                state = 1;
                const questionIndex = Math.floor(Math.random() * QUESTIONS.length);
                const currentQ = QUESTIONS[questionIndex];
                const tempUsers = afterData.users;

                afterData.users.forEach(element => {
                    const index = tempUsers.findIndex(user => user.uid === element.currentVote);
                    if (index !== -1) {
                        tempUsers[index].points = tempUsers[index].points + 1;
                    }
                })

                admin.firestore().collection('Lobbies').doc(params.lobbyID)
                    .update({
                        startNextState: false,
                        state,
                        currentQ,
                        users: tempUsers
                    })
                    .catch(err => console.log('lobby update error', err))
            }
        }
        return true;
    })
