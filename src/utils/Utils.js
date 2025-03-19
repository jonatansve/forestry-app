import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, query, where, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getCollection = async (collectionName, conditions = []) => {
  let q = collection(db, collectionName);
  
  if (conditions.length > 0) {
    q = query(q, ...conditions.map(c => where(c.field, c.operator, c.value)));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const calculateArea = (coordinates) => {
  // Implementation of area calculation
  return 0; // Placeholder
};

export const calculateVolume = (area, height) => {
  // Implementation of volume calculation
  return 0; // Placeholder
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('sv-SE').format(number);
};

export const geoPointToArrayList = (input) => {
    let output = []
  
    input.forEach(coord => {
      //console.log(coord)
      let newcoord = [coord.x_, coord.N_]
      output.push(newcoord)
    }) 
    return output
}

export const geoJsonToFirestore = async (featurecollection) => {
  const collectionRef = collection(db, "areas");
  
  for (let feature of featurecollection.features) {
    await addDoc(collectionRef, {
      areaID: feature.properties.color.toString(),
      coordinates: feature.geometry.coordinates[0],
    });
  }
};