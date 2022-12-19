import { useState, useEffect } from "react";
import { projectStorage, projectFirestore } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
let number = 1;

export const useStorage = (file: File) => {
  let run = false;
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (run) return;
    run = true;
    //creating a reference to a file in the storage
    const storageRef = ref(projectStorage, `images/${file.name}`);
    const collectionRef = collection(getFirestore(), "images");
    //starting to upload the file to the storage that we are pointing to in this case its to images collection
    const uploadTask = uploadBytesResumable(storageRef, file);
    //and when the event of uploading happends we are going to change the state to show the progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        setError(err.message);
      },
      async () => {
        const url = await getDownloadURL(storageRef).then((res) => res);
        await addDoc(collectionRef, {
          url: url,
          createdAt: serverTimestamp(),
        });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};
