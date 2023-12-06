import {collection, addDoc} from 'firebase/firestore';
import {db} from '../shared/firebase/firebase';

const pollsRef = collection(db, 'polls');

export const addPoll = async newPoll => {
  addDoc(pollsRef, newPoll);
};
