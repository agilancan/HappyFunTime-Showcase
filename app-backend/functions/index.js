const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
                                            hostUserID: inGameUsers[0]
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
                                            hostUserID: inGameUsers[0]
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
