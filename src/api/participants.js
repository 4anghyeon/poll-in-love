import {addDoc, getDocs, collection, where, query} from 'firebase/firestore';
import {db} from '../shared/firebase/firebase';

const participantsRef = collection(db, 'participants');

export const addParticipant = newParticipant => {
  addDoc(participantsRef, newParticipant);
};

export const findParticipantByPollId = async pollId => {
  const selectQuery = await query(participantsRef, where('pollId', '==', pollId));
  const querySnapshot = await getDocs(selectQuery);
  const data = [];
  querySnapshot.docs.forEach(doc => {
    data.push(doc.data());
  });
  return data;
};

export const findParticipantByPollIdAndUserId = async (pollId, userId) => {
  const selectQuery = await query(participantsRef, where('pollId', '==', pollId), where('participant', '==', userId));
  const querySnapshot = await getDocs(selectQuery);
  const data = [];
  querySnapshot.docs.forEach(doc => {
    data.push(doc.data());
  });
  return data;
};
