import {firebase} from "../firebase";

export const logInWithGoogle = () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    } catch (err) {
        console.error(err);
    }
}
