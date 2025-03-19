export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface ForestData {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  area: number;
  species: string[];
  age: number;
  lastUpdated: Date;
  createdBy: string;
}

export interface Action {
  id: string;
  forestId: string;
  type: 'planting' | 'harvesting' | 'maintenance';
  date: Date;
  description: string;
  createdBy: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface MapFeature {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'Polygon';
    coordinates: number[] | number[][];
  };
  properties: {
    id: string;
    name: string;
    type: string;
    [key: string]: any;
  };
}

export interface MapFeatureCollection {
  type: 'FeatureCollection';
  features: MapFeature[];
} 