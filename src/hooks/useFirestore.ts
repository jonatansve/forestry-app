import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
  Query,
  DocumentReference,
  WithFieldValue,
  UpdateData
} from 'firebase/firestore';
import { db } from '../utils/firebase';

interface QueryCondition {
  field: string;
  operator: '==' | '<' | '>' | '<=' | '>=' | '!=';
  value: any;
}

export const useFirestore = <T extends DocumentData>(collectionName: string, conditions: QueryCondition[] = []) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!collectionName) {
          setData([]);
          return;
        }

        let q: Query<DocumentData> = collection(db, collectionName);
        
        if (conditions && conditions.length > 0) {
          q = query(q, ...conditions.map(c => where(c.field, c.operator, c.value)));
        }

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as unknown as T[];

        setData(documents || []);
        setError(null);
      } catch (err) {
        console.error('Firestore error:', err);
        setError(err as Error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, JSON.stringify(conditions)]);

  const addDocument = async (document: Omit<T, 'id'>) => {
    try {
      if (!collectionName) {
        throw new Error('Collection name is required');
      }
      const docRef = await addDoc(collection(db, collectionName), document as WithFieldValue<DocumentData>);
      return docRef.id;
    } catch (err) {
      console.error('Add document error:', err);
      setError(err as Error);
      throw err;
    }
  };

  const updateDocument = async (id: string, document: Partial<T>) => {
    try {
      if (!collectionName || !id) {
        throw new Error('Collection name and document ID are required');
      }
      const docRef = doc(db, collectionName, id) as DocumentReference<T>;
      await updateDoc(docRef, document as UpdateData<T>);
    } catch (err) {
      console.error('Update document error:', err);
      setError(err as Error);
      throw err;
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      if (!collectionName || !id) {
        throw new Error('Collection name and document ID are required');
      }
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Delete document error:', err);
      setError(err as Error);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
  };
}; 