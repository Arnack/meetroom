import {useEffect, useState} from "react";
import {db, firebase, setupPresence} from "../firebase";

export function useAuth() {
    const [user, setUser] = useState();
    //auth auth
    useEffect(() => {
        return firebase.auth().onAuthStateChanged((firebaseUser) => {

            if (firebaseUser) {
                const tmpUser = {
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    uid: firebaseUser.uid,
                    email: firebaseUser.email
                }
                setUser(tmpUser);
                db
                    .collection('users')
                    .doc(tmpUser.uid)
                    .set(tmpUser, {merge: true});

                setupPresence(tmpUser);

            } else {
                setUser(null);
            }
        })
    }, []);

    return user;
}
