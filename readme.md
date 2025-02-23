# Uber Clone

This project is a clone of the Uber app, built using modern web technologies. It aims to replicate the core functionalities of the Uber app, including user authentication, ride booking, and real-time location tracking.

## Features

- User Authentication
- Ride Booking
- Real Time Location Tracking
- User Profile Management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)
- Google Maps API Key

## Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```
MONGO_URI=your_mongodb_connection_string
GOOGLE_MAPS_API=your_google_maps_api_key
JWT_SECRET=your_jwt_secret
```
Create a `.env` file in the frontend directory and add the following environment variables:

```
VITE_BASE_URL=your_backend_baseurl
VITE_GOOGLE_MAPS_API=your_google_maps_api_key
```

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure all dependencies are installed correctly.
- Verify that your environment variables are set up properly.
- Check the console for any error messages and follow the instructions provided.

For further assistance, feel free to open an issue on the GitHub repository.


## Technologies Used

- Frontend: Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB

- Maps: Google Maps API

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/aaydube/uber-clone.git
    ```
2. Navigate to the project directory:
    ```sh
    cd uber-clone
    ```
3. Install dependencies for the backend:
    ```sh
    cd backend
    npm install
    ```
4. Install dependencies for the frontend:
    ```sh
    cd ../frontend
    npm install
    ```

## Usage

1. Start the backend server:
    ```sh
    cd backend
    npx nodemon
    ```
2. Start the frontend development server:
    ```sh
    cd ../frontend
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:5173`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.