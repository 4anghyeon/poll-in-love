import {collection, doc, getDocs, increment, query, updateDoc, where} from 'firebase/firestore';
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

export const getItmesByTargetIds = async targetItemIds => {
  const q = query(itemsRef, where('__name__', 'in', targetItemIds));
  const querySnapshot = await getDocs(q);

  const initialItems = [];
  querySnapshot.forEach(doc => {
    const data = {
      id: doc.id,
      ...doc.data(),
    };
    initialItems.push(data);
  });
  console.log('initialItems', initialItems);
  return initialItems;
};

export const incrementSales = async itemId => {
  const itemRef = doc(db, 'items', itemId);
  return updateDoc(itemRef, {
    sales: increment(1),
  });
};
