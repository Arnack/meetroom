import {useEffect, useState} from "react";
import {db} from "../firebase";

const docCache: any = {};
const pendingDocCache: any = {};

export const useCachedDoc = (path: string) => {
    const [doc, setDoc] = useState(docCache[path]);

    useEffect(() => {
        if (doc) {
            return;
        }

        let stillMounted = true;
        const pending = pendingDocCache[path];
        const promice =
            pending || (pendingDocCache[path] = db
                .doc(path).get());

        promice.then((doc: any) => {
            if (stillMounted) {
                const user = {
                    ...doc.data(),
                    id: doc.id
                }
                setDoc(user);
                docCache[path] = user;
            }
        });

        return () => {
            stillMounted = false;
        }
    }, [path]);

    return doc;
}
