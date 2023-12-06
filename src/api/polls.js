import {collection, addDoc, getDocs, getDoc, query, where, doc} from 'firebase/firestore';

import {db} from '../shared/firebase/firebase';

const pollsRef = collection(db, 'polls');

export const addPoll = async newPoll => {
  addDoc(pollsRef, newPoll);
};

export const getPolls = async () => {
  const res = await getDocs(pollsRef);
  const polls = res.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return polls;
};

export const getPollById = async pollId => {
  const pollRef = doc(db, 'polls', pollId);
  const poll = await getDoc(pollRef);
  return {id: poll.id, ...poll.data()};
};
