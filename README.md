# Forestry App

A modern web application for managing forestry data and operations. Built with React, TypeScript, and Material-UI.

## Features

- Interactive map visualization of forest areas
- Forest data management and tracking
- Action tracking (planting, harvesting, maintenance)
- User authentication and authorization
- Data visualization with charts
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Material-UI v5
- Firebase (Authentication & Firestore)
- Mapbox GL
- React Query
- Zustand (State Management)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Mapbox account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/forestry-app.git
cd forestry-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── common/          # Reusable components
├── components/      # Feature-specific components
├── constants/       # Application constants
├── features/        # Feature-specific code
├── hooks/          # Custom React hooks
├── providers/      # Context providers
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App
- `npm run lint` - Runs ESLint
- `npm run lint:fix` - Fixes ESLint issues
- `npm run format` - Formats code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
