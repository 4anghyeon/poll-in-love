import {collection, addDoc, getDoc, query, where, doc, updateDoc, increment} from 'firebase/firestore';
import {db} from '../shared/firebase/firebase';

const usersRef = collection(db, 'users');
// mutationFns
export const addUser = async newUser => await addDoc(usersRef, newUser);

export const updateUserPoint = async (userId, point) => {
  console.log(userId, point);
  const userRef = doc(db, 'users', '2uplvYaJV1EqrNWfDV0s');
  return updateDoc(userRef, {
    point: increment(point),
  });
};

// queryFns
