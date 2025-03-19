import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from 'firebase/firestore';

export const useFirestore = <T extends DocumentData>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const db = getFirestore();

  const fetchData = async (conditions: { field: string; operator: any; value: any }[] = []) => {
    try {
      setLoading(true);
      let q = collection(db, collectionName);
      
      if (conditions.length > 0) {
        q = query(q, ...conditions.map(c => where(c.field, c.operator, c.value)));
      }

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      setData(documents);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (document: Omit<T, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), document);
      return docRef.id;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateDocument = async (id: string, document: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, document);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    addDocument,
    updateDocument,
    deleteDocument,
  };
}; 