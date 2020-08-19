import {db} from '../firebase';
import {useEffect, useState} from "react";

export default function useCollection(path: string, orderBy?: string) {
    const [docs, setDocs] = useState<any[]>([]);

    useEffect(() => {
        let collection = db.collection(path);

        if (orderBy) {
            //@ts-ignore
            collection = collection.orderBy(orderBy);
        }

        return collection.onSnapshot((snapshot => {
            const docs: any[] = [];
            snapshot.forEach((doc) => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setDocs(docs);
        }));
    }, [path, orderBy]);

    return docs;
}
