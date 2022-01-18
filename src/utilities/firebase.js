// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVTHy4iJuvupjDTHhmDlPoljHFpKKMlo0",
    authDomain: "scheduler-7eeaf.firebaseapp.com",
    databaseURL: "https://scheduler-7eeaf-default-rtdb.firebaseio.com",
    projectId: "scheduler-7eeaf",
    storageBucket: "scheduler-7eeaf.appspot.com",
    messagingSenderId: "358930484687",
    appId: "1:358930484687:web:65d215a00072aa2dfc56ba",
    measurementId: "G-2HL9BDZGNG"
};


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);