import {useEffect, useState} from "react";
import {db} from "../firebase";

export const useDoc = (path: string) => {
    const [doc, setDoc] = useState();

    useEffect(() => {
        return db.doc(path).onSnapshot(doc => {
            setDoc({
                ...doc.data(),
                id: doc.id
            });
        });
    }, [path]);

    return doc;
}
