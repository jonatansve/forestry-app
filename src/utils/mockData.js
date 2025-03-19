export const mockUser = {
  uid: 'mock-user-id',
  email: 'test@example.com',
  displayName: 'Test User'
};

export const mockAreas = [
  {
    id: '1',
    areaID: '1',
    coordinates: [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
      [0, 0]
    ]
  }
];

export const mockTrees = [
  {
    id: '1',
    areaID: '1',
    species: 'Oak',
    age: 50,
    height: 20,
    coordinates: [0.5, 0.5]
  }
];

export const mockActions = [
  {
    id: '1',
    areaID: '1',
    type: 'Planting',
    date: new Date().toISOString(),
    description: 'Sample planting action'
  }
]; 