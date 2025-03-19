import { mockAreas, mockTrees, mockActions } from './mockData';

// Mock database
export const mockDb = {
  areas: mockAreas,
  trees: mockTrees,
  actions: mockActions
};

// Mock db for compatibility with Firebase
export const db = {
  collection: (collectionName) => ({
    doc: (id) => ({
      get: async () => {
        const doc = mockDb[collectionName]?.find(d => d.id === id);
        return { exists: () => !!doc, data: () => doc };
      },
      set: async (data) => {
        const index = mockDb[collectionName]?.findIndex(d => d.id === id);
        if (index !== -1) {
          mockDb[collectionName][index] = { ...mockDb[collectionName][index], ...data };
        }
      },
      update: async (data) => {
        const index = mockDb[collectionName]?.findIndex(d => d.id === id);
        if (index !== -1) {
          mockDb[collectionName][index] = { ...mockDb[collectionName][index], ...data };
        }
      },
      delete: async () => {
        const index = mockDb[collectionName]?.findIndex(d => d.id === id);
        if (index !== -1) {
          mockDb[collectionName].splice(index, 1);
        }
      }
    })
  })
};

// Mock auth
export const auth = {
  currentUser: null,
  signInWithEmailAndPassword: async () => {
    return { user: { uid: 'mock-user-id' } };
  },
  signOut: async () => {
    console.log('Mock: User signed out');
  }
};

// Mock database functions
export const getDocument = async (collectionName, id) => {
  const collection = mockDb[collectionName];
  if (!collection) return null;
  return collection.find(doc => doc.id === id) || null;
};

export const getCollection = async (collectionName, conditions = []) => {
  let collection = mockDb[collectionName];
  if (!collection) return [];

  // Apply conditions if any
  if (conditions.length > 0) {
    collection = collection.filter(doc => {
      return conditions.every(condition => {
        switch (condition.operator) {
          case '==':
            return doc[condition.field] === condition.value;
          case '>':
            return doc[condition.field] > condition.value;
          case '<':
            return doc[condition.field] < condition.value;
          default:
            return true;
        }
      });
    });
  }

  return collection;
};

export const addDocument = async (collectionName, document) => {
  const collection = mockDb[collectionName];
  if (!collection) return null;

  const newDoc = {
    id: String(collection.length + 1),
    ...document
  };
  collection.push(newDoc);
  return newDoc.id;
};

export const updateDocument = async (collectionName, id, document) => {
  const collection = mockDb[collectionName];
  if (!collection) return;

  const index = collection.findIndex(doc => doc.id === id);
  if (index !== -1) {
    collection[index] = { ...collection[index], ...document };
  }
};

export const deleteDocument = async (collectionName, id) => {
  const collection = mockDb[collectionName];
  if (!collection) return;

  const index = collection.findIndex(doc => doc.id === id);
  if (index !== -1) {
    collection.splice(index, 1);
  }
};

export const generateUserDocument = async (userId, userData) => {
  // In mock mode, we don't need to do anything
  console.log('Mock: Generating user document', { userId, userData });
};
