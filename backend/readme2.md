# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. Validates the input data, hashes the password, and creates a new user record. Returns the created user object (without the password).

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Can be empty.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "johndoe@example.com",
        "socketId": null,
        "createdAt": "2025-06-02T12:00:00.000Z",
        "updatedAt": "2025-06-02T12:00:00.000Z",
        "__v": 0
      }
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message here",
          "param": "fieldName",
          "location": "body"
        }
      ]
    }
    ```

### Duplicate Email Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "User already exists with this email"
    }
    ```

---

## Notes

- Password is never returned in the response.
- All fields are required except `fullName.lastName`.
- The endpoint expects `Content-Type: application/json` header.

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Logs in an existing user. Validates the input data, checks the credentials, and returns the user object along with a JWT token if authentication is successful.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Cannot be empty.

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "johndoe@example.com",
        "socketId": null,
        "createdAt": "2025-06-02T12:00:00.000Z",
        "updatedAt": "2025-06-02T12:00:00.000Z",
        "__v": 0
      },
      "token": "jwt_token_here"
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message here",
          "param": "fieldName",
          "location": "body"
        }
      ]
    }
    ```

### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

## Notes

- Password is never returned in the response.
- The endpoint expects `Content-Type: application/json` header.
- On success, a JWT token is returned for authentication in future requests.

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Fetches the profile of the currently authenticated user. Requires a valid JWT token in the `Authorization` header.

---

## Request Headers

- `Authorization: Bearer <jwt_token_here>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id_here",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "johndoe@example.com",
        "socketId": null,
        "createdAt": "2025-06-02T12:00:00.000Z",
        "updatedAt": "2025-06-02T12:00:00.000Z",
        "__v": 0
      }
    }
    ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

## Notes

- Requires a valid JWT token.
- Password is never returned in the response.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the currently authenticated user by blacklisting the JWT token and clearing the user's session/socket information.

---

## Request Headers

- `Authorization: Bearer <jwt_token_here>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "User logged out successfully"
    }
    ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

## Notes

- Requires a valid JWT token.
- The token is blacklisted and cannot be used again.
- The user's session/socketId is cleared on logout.

---

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description

Registers a new captain in the system. Validates the input data, hashes the password, and creates a new captain record with vehicle details. Returns the created captain object (without the password) and a JWT token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "Ashu",
    "lastName": "Rajput"
  },
  "email": "ashu@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "black",
    "plate": "UP20234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Can be empty.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (number, required): Minimum 1.
- `vehicle.vehicleType` (string, required): One of `"car"`, `"motorcycle"`, or `"auto"`.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "captain": {
        "_id": "captain_id_here",
        "fullName": {
          "firstName": "Ashu",
          "lastName": "Rajput"
        },
        "email": "ashu@example.com",
        "vehicle": {
          "color": "black",
          "plate": "UP20234",
          "capacity": 4,
          "vehicleType": "car"
        },
        "status": "active",
        "socketId": null,
        "createdAt": "2025-06-02T12:00:00.000Z",
        "updatedAt": "2025-06-02T12:00:00.000Z",
        "__v": 0
      },
      "token": "jwt_token_here"
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message here",
          "param": "fieldName",
          "location": "body"
        }
      ]
    }
    ```

### Duplicate Email Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "Captain already exists with this email"
    }
    ```

---

## Notes

- Password is never returned in the response.
- All vehicle fields are required.
- The endpoint expects `Content-Type: application/json` header.
- On success, a JWT token is returned for authentication in future requests.