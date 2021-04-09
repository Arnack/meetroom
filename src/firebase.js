import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {

    const isOfflineForRTDB = {
        state: 'offline',
        lastChanged: firebase.database.ServerValue.TIMESTAMP
    }
    const isOnlineForRTDB = {
        state: 'online',
        lastChanged: firebase.database.ServerValue.TIMESTAMP
    }

    const isOfflineForFirestore = {
        state: 'offline',
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    }
    const isOnlineForFirestore = {
        state: 'online',
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    }

    const rtdbRef = rtdb.ref(`users${user.id}`); // .ref is similar to .doc in firestore
    const userDoc = db.doc(`users${user.id}`);

    rtdb.ref('.info/connected').on('value', async (snapshot) => {
        if (snapshot.val()) { //boolean
            await  rtdbRef.onDisconnect().set(isOfflineForRTDB);
            rtdbRef.set(isOnlineForRTDB);
            userDoc.update({
                status: isOnlineForFirestore
            })
        } else {
            userDoc.update({
                status: isOfflineForFirestore
            })
            return;
        }
    })
}

export { db, firebase };
