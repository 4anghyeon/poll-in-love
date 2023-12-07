import {collection, addDoc, getDoc, query, where} from 'firebase/firestore';
import {db} from '../shared/firebase/firebase';

const usersRef = collection(db, 'users');
// mutationFns
export const addUser = async newUser => await addDoc(usersRef, newUser);

// queryFns
