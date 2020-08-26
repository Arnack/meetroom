import {db} from '../firebase';
import {useEffect, useState} from "react";

export default function useCollection(path: string, orderBy?: string, where=[]) {
    const [docs, setDocs] = useState<any[]>([]);
    const [queryField, queryOperator, queryValue] = where;

    useEffect(() => {
        let collection = db.collection(path);

        if (orderBy) {
            //@ts-ignore
            collection = collection.orderBy(orderBy);
        }

        if (queryField) {
            // @ts-ignore
            collection = collection.where(
                queryField,
                queryOperator,
                queryValue
            )
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
    }, [path, orderBy, queryField, queryOperator, queryValue]);

    return docs;
}
