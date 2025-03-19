export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const MAP_STYLE = 'mapbox://styles/mapbox/outdoors-v11';

export const DEFAULT_MAP_VIEW = {
  longitude: 15.2,
  latitude: 58.4,
  zoom: 6,
};

export const CHART_COLORS = {
  primary: '#1976d2',
  secondary: '#dc004e',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
};

export const ACTION_TYPES = {
  PLANTING: 'planting',
  HARVESTING: 'harvesting',
  MAINTENANCE: 'maintenance',
} as const;

export const COLLECTIONS = {
  FORESTS: 'forests',
  ACTIONS: 'actions',
  USERS: 'users',
} as const;

export const ROUTES = {
  HOME: '/',
  FOREST: '/forest/:id',
  ACTIONS: '/actions',
  PROFILE: '/profile',
} as const; 