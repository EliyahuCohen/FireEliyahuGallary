import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

//this is a hook that what ever collection we are going to pass in its going to retrive the data from

export interface DOC {
  createdAt: Timestamp;
  id: string;
  url: string;
}

const useFirestore = (collectionName: string) => {
  const [docs, setDocs] = useState<DOC[]>([]);

  const collectionRef = collection(projectFirestore, collectionName);
  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      let documents: any = [];
      snapshot.docs.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
    return () => unsub(); //this function will unsubscribe from the collection whenerver we dont need it
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
