# LoadLink SA

A mobile application connecting customers needing goods transported with independent bakkie/light truck owners in South Africa.

## Project Structure

```
loadlink-sa/
├── frontend/           # React Native mobile application
├── backend/           # Node.js + Express API server
└── docs/             # Project documentation
```

## Features

- Load posting and management
- Driver availability tracking
- Load-driver matching system
- Quote management
- Basic user verification
- GPS tracking
- In-app chat
- Secure payment integration
- User ratings and reviews

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment
- MongoDB
- Android Studio / Xcode (for mobile development)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on Android:
   ```bash
   npm run android
   ```

5. Run on iOS:
   ```bash
   npm run ios
   ```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details. 