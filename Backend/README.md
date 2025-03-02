# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
  - `password` (string): User's password.
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Logs in a user with the provided email and password.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address.
- `password` (string, required): User's password.

### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Gets the profile of the logged-in user.

### HTTP Method

`GET`

### Example Response

- `user` (object): The profile of the logged-in user.

## `/users/logout` Endpoint

### Description

Logs out the user by invalidating the JWT token.

### HTTP Method

`GET`

### Example Response

- `message` (string): Confirmation message.

## `/rides` Endpoint

### Description

Gets all rides.

### HTTP Method

`GET`

### Example Response

- `rides` (array): List of rides.

## `/rides/create` Endpoint

### Description

Creates a new ride.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup location.
- `destination` (string, required): The dropoff location.
- `vehicleType` (string, required): The type of vehicle.

### Example Response

- `ride` (object): The created ride.

## `/rides/get-fare` Endpoint

### Description

Gets the fare for a ride based on the pickup and destination locations.

### HTTP Method

`POST`

### Request Query

The request query should include the following fields:

- `pickup` (string, required): The pickup location.
- `destination` (string, required): The dropoff location.

### Example Response

- `fare` (object): The fare for the ride.

## `/rides/confirm` Endpoint

### Description

Confirms a ride by the driver.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): The ID of the ride.

### Example Response

- `ride` (object): The confirmed ride.

## `/rides/start-ride` Endpoint

### Description

Starts a ride by the driver.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): The ID of the ride.
- `otp` (string, required): The OTP for the ride.

### Example Response

- `ride` (object): The started ride.

## `/rides/end-ride` Endpoint

### Description

Ends a ride by the driver.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): The ID of the ride.

### Example Response

- `ride` (object): The ended ride.

## `/drivers/register` Endpoint

### Description

Registers a new driver by creating a driver account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Driver's first name (minimum 3 characters).
  - `lastname` (string, optional): Driver's last name (minimum 3 characters).
- `email` (string, required): Driver's email address (must be a valid email).
- `password` (string, required): Driver's password (minimum 6 characters).
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle capacity (minimum 1).
  - `vehicleType` (string, required): Vehicle type (must be one of 'car', 'motorcycle', 'auto').

### Example Response

- `driver` (object): The created driver.
- `token` (String): JWT Token

## `/drivers/login` Endpoint

### Description

Logs in a driver with the provided email and password.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): Driver's email address.
- `password` (string, required): Driver's password.

### Example Response

- `driver` (object): The logged-in driver.
- `token` (String): JWT Token

## `/drivers/profile` Endpoint

### Description

Gets the profile of the logged-in driver.

### HTTP Method

`GET`

### Example Response

- `driver` (object): The profile of the logged-in driver.

## `/drivers/logout` Endpoint

### Description

Logs out the driver by invalidating the JWT token.

### HTTP Method

`GET`

### Example Response

- `message` (string): Confirmation message.

## `/maps/get-coordinates` Endpoint

### Description

Gets the coordinates for a given address.

### HTTP Method

`POST`

### Request Query

The request query should include the following fields:

- `address` (string, required): The address to get coordinates for.

### Example Response

- `coordinates` (object): The coordinates for the address.

## `/maps/get-distance` Endpoint

### Description

Gets the distance and time between two locations.

### HTTP Method

`POST`

### Request Query

The request query should include the following fields:

- `origin` (string, required): The origin location.
- `destination` (string, required): The destination location.

### Example Response

- `distanceTime` (object): The distance and time between the locations.

## `/maps/get-suggestions` Endpoint

### Description

Gets address suggestions based on input.

### HTTP Method

`POST`

### Request Query

The request query should include the following fields:

- `input` (string, required): The input for address suggestions.

### Example Response

- `suggestions` (array): List of address suggestions.
