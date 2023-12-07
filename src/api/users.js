import {collection, addDoc, getDoc, query, where, doc, updateDoc, increment, getDocs} from 'firebase/firestore';
import {db} from '../shared/firebase/firebase';
import {v4 as uuidv4} from 'uuid';

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
export const getUserById = async userId => {
  const userRef = doc(db, 'users', userId);
  const user = await getDoc(userRef);
  return {id: user.id, ...user.data()};
};

export const getUserByEmail = async userEmail => {
  const q = query(collection(db, 'users'), where('email', '==', userEmail));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const userData = {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()};
      return userData;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
  return null;
};
