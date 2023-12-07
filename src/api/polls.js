import {collection, addDoc, getDocs, getDoc, updateDoc, doc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import {db, storage} from '../shared/firebase/firebase';

const pollsRef = collection(db, 'polls');

export const addPoll = async newPoll => {
  const result = await addDoc(pollsRef, newPoll);
  return result.id;
};

export const getPolls = async () => {
  const res = await getDocs(pollsRef);
  const polls = res.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return polls;
};

export const updatePollThumbnail = async (pollId, imgUrl) => {
  const pollRef = doc(db, 'polls', pollId);
  return updateDoc(pollRef, {
    thumbnail: imgUrl,
  });
};

export const getPollById = async pollId => {
  const pollRef = doc(db, 'polls', pollId);
  const poll = await getDoc(pollRef);
  return {id: poll.id, ...poll.data()};
};

export const uploadThumbnail = async (pollId, imgFile) => {
  const imageRef = ref(storage, `${pollId}/thumbnail`);
  await uploadBytes(imageRef, imgFile);
  return getDownloadURL(imageRef);
};
