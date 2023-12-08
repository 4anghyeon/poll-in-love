import {collection, getDocs} from 'firebase/firestore';
import {db} from '../shared/firebase/firebase';

const itemsRef = collection(db, 'items');

export const getItems = async () => {
  const res = await getDocs(itemsRef);
  const items = res.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return items;
};