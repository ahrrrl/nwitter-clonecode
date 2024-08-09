import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC74phgDq5Lcy5g-_QFihxcSDkU2JFSgco',
  authDomain: 'nwitter-f6093.firebaseapp.com',
  projectId: 'nwitter-f6093',
  storageBucket: 'nwitter-f6093.appspot.com',
  messagingSenderId: '796248333190',
  appId: '1:796248333190:web:8834f698e154f8302c6a07',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
