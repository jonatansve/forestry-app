import { mockAreas, mockTrees, mockActions, mockUser } from './mockData';

// Mock database
export const mockDb = {
  areas: mockAreas,
  trees: mockTrees,
  actions: mockActions,
  users: [mockUser] // Initialize users collection with mockUser
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
  currentUser: mockUser,
  signInWithEmailAndPassword: async () => {
    return { user: mockUser };
  },
  signOut: async () => {
    console.log('Mock: User signed out');
  }
};

// Mock authentication methods
export const signInWithEmailAndPassword = async (email, password) => {
  console.log('Mock: Signing in with email and password');
  return { user: mockUser };
};

export const signOut = async () => {
  console.log('Mock: User signed out');
};

// Mock database functions
export const getDocument = async (collectionName, docId) => {
  try {
    const collection = mockDb[collectionName];
    if (!collection) return null;
    
    const doc = collection.find(d => d.id === docId);
    return doc || null;
  } catch (err) {
    console.error('Error getting document:', err);
    return null;
  }
};

export const getCollection = async (collectionName) => {
  try {
    const collection = mockDb[collectionName];
    if (!collection) {
      console.warn(`Collection ${collectionName} not found`);
      return [];
    }
    return collection;
  } catch (err) {
    console.error('Error getting collection:', err);
    return [];
  }
};

export const addDocument = async (collectionName, document) => {
  try {
    const collection = mockDb[collectionName];
    if (!collection) {
      console.warn(`Collection ${collectionName} not found`);
      return null;
    }

    const newDoc = {
      id: String(collection.length + 1),
      ...document
    };
    
    collection.push(newDoc);
    return newDoc.id;
  } catch (err) {
    console.error('Error adding document:', err);
    return null;
  }
};

export const updateDocument = async (collectionName, docId, document) => {
  try {
    const collection = mockDb[collectionName];
    if (!collection) {
      console.warn(`Collection ${collectionName} not found`);
      return;
    }

    const index = collection.findIndex(doc => doc.id === docId);
    if (index !== -1) {
      collection[index] = { ...collection[index], ...document };
    }
  } catch (err) {
    console.error('Error updating document:', err);
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    const collection = mockDb[collectionName];
    if (!collection) {
      console.warn(`Collection ${collectionName} not found`);
      return;
    }

    const index = collection.findIndex(doc => doc.id === docId);
    if (index !== -1) {
      collection.splice(index, 1);
    }
  } catch (err) {
    console.error('Error deleting document:', err);
  }
};

export const generateUserDocument = async (user) => {
  try {
    const collection = mockDb['users'];
    if (!collection) {
      console.warn('Users collection not found');
      return null;
    }

    const newUser = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      createdAt: new Date().toISOString()
    };
    
    collection.push(newUser);
    return newUser;
  } catch (err) {
    console.error('Error generating user document:', err);
    return null;
  }
};
