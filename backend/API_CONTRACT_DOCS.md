# API Contract Documentation
---------------

## Error Object
```json
{
    "code": integer,
    "status": string,
    "error" : {
        "name": string,
        "details": string,
    },
    "meta": {
        "timestamp": datetime
    }
}
```
## example :
```json
{
    "code": 400,
    "status": "Bad Request",
    "error" : {
        "name": "ValidationError",
        "details": "email is required",
    },
    "meta": {
        "timestamp": "2020-12-12T12:12:12.000Z"
    }
}
```
---------------

# Auth

## **POST** /api/auth/register

Registers a new user

-   **URL Params**  
    None
-   **Data Params**
    ```json
    {
        "name" : string,
        "email" : string,
        "password" : string,
        "confirmPassword" : string,
    }
    ```
-   **Headers**

    Content-Type: application/json

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code" : 201,
    "status" : "Created",
    "data" : {
        "name": "user",
        "data" : {
            "name" : string,
            "email" : string,
        }
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **GET** /api/auth/authenticated

Returns an authenticated user data

-   **URL Params**  
    None
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {
            "name" : string,
            "email" : string,
        }
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

# User

-   User Object

```json
{
    // Firebase Auth Data
    "id": integer,
    "uid": string | null,
    "email": string
    "password": string, // Hidden
    "disabled": boolean,
    // User Data
    "name": string,
    "NIP": string | null,
    "gender": "L" | "P",
    "jabatan": string,
    "approved": boolean,

    "roleId": integer, // Foreign Key, Hidden

    "createdAt": string, // Hidden
    "updatedAt": string // Hidden
}
```

## **GET** /api/users

Returns all users in the database

-   **URL Params**  
     Query Params:
    -   `id=[integer]`
    -   `uid=[string]`
    -   `email=[string]`
    -   `name=[string]`
    -   `NIP=[string]`
    -   `jabatan=[string]`
    -   `approved=[boolean]`
    -   `disabled=[boolean]`
-   **Data Params**  
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "users",
        "data" : {
            {<user_object>},
            {<user_object>},
            {<user_object>}
        }
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **GET** /api/users/:id

Returns a user with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **POST** /api/users

Creates a new user

-   **URL Params**  
    None
-   **Data Params**
    ```json
    {
        "email": string,
        "password": string,
        "name": string,
        "gender": "L" | "P",
        "NIP": string,
        "jabatan": string,
        "approved": boolean,
        "roleId": integer // Foreign Key
    }
    ```
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code" : 201,
    "status" : "Created",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **POST** /api/users/:id/approve

Approves a user with the specified id

-   **URL Params**  
    query params: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code" : 201,
    "status" : "Created",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **PUT** /api/users/:id

Updates a user with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    ```json
    {
        "email": string,
        "password": string,
        "name": string,
        "gender": "L" | "P",
        "NIP": string,
        "jabatan": string,
        "approved": boolean,
        "roleId": integer // Foreign Key
    }
    ```
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **PUT** /api/users/:id/profile

Updates a user profile with the specified id and the user must same with the user id in the token

-   **URL Params**  
    Required: id = [integer]
-   **DATA PARAMS**
     ```json
    {
        "email": string,
        "password": string,
        "name": string,
        "gender": "L" | "P",
        "NIP": string,
        "jabatan": string,
        "approved": boolean,
        "roleId": integer // Foreign Key
    }
    ```
-   **Headers**
    
        Content-Type: application/json  
        authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

# **PUT** /api/users/:id/approve

Updates an approved user with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

# **PUT** /api/users/:id/disable

Disables/Enables a user with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **DELETE** /api/users/:id

Deletes a user with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

## **DELETE** /api/users/:id/approve

Deletes a approved user with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code" : 200,
    "status" : "OK",
    "data" : {
        "name": "user",
        "data" : {<user_object>}
    },
    "meta" : {
        "timestamp" : datetime,
    }
}
```

# Role

-   Role Object

```json
{
    "id": integer,
    "name": string,
    "createdAt": string, // Hidden
    "updatedAt": string // Hidden
}
```

## **GET** /api/roles

Returns all roles in the database

-   **URL Params**  
    None
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code": 200,
    "status": "OK",
    "data": {
        "name": "roles",
        "data": {
            {<role_object>},
            {<role_object>},
            {<role_object>}
        }
    },
    "meta": {
        "timestamp": datetime
    }
}
```

## **GET** /api/roles/:id

Returns a role with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code": 200,
    "status": "OK",
    "data": {
        "name": "role",
        "data": {<role_object>}
    },
    "meta": {
        "timestamp": datetime
    }
}
```

## **GET** /api/roles/:id/users

Returns a role with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    None
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code": 200,
    "status": "OK",
    "data": {
        "name": "role",
        "data": {

        }
    },
    "meta": {
        "timestamp": datetime
    }
}
```

## **POST** /api/roles

Creates a new role

-   **URL Params**  
    None
-   **Data Params**
    ```json
    {
        "name": string
    }
    ```
-   **Headers**

    Content-Type: application/json  
     authorization: bearer [token]

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code": 201,
    "status": "Created",
    "data": {
        "name": "role",
        "data": {<role_object>}
    },
    "meta": {
        "timestamp": datetime
    }
}
```

## **PUT** /api/roles/:id

Updates a role with the specified id

-   **URL Params**  
    Required: id = [integer]
-   **Data Params**
    ```json
    {
        "name": string
    }
    ```
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code": 201,
    "status": "Created",
    "data": {
        "name": "role",
        "data": {<role_object>}
    },
    "meta": {
        "timestamp": datetime
    }
}
```

## **DELETE** /api/roles/:id

Deletes a role with the specified id

-   **URL Params**  
    Required: id = [integer]

-   **Data Params**
    None

-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code": 201,
    "status": "Created",
    "data": {
        "name": "role",
        "data": {<role_object>}
    },
    "meta": {
        "timestamp": datetime
    }
}
```

# DeviceToken (FCM)

- DeviceToken Object

```json
{
    "id": integer,
    "userId": integer, // Foreign Key
    "token": string,
    "user" :{<user_object>},
    "createdAt": string, // Hidden
    "updatedAt": string // Hidden
}
```

## **GET** /api/deviceToken

Returns all device token in the database

-   **URL Params**  
    None
-   **Data Params**
    None
-   **Headers**
    
        Content-Type: application/json  
        authorization: bearer [token]

-   **Success Response:**
-   **Code:** 200  
    **Content:**

```json
{
    "code": 200,
    "status": "OK",
    "data": {
        "name": "deviceTokens",
        "data": {
            {<deviceToken_object>},
            {<deviceToken_object>},
            {<deviceToken_object>}
        }
    },
    "meta": {
        "timestamp": datetime
    }
}
```

## **POST** /api/deviceToken

Save user device token for push notification

-   **URL Params**  
    None
-   **Data Params**
    ```json
    {
        "token": string
    }
    ```
-   **Headers**

    Content-Type: application/json  
    authorization: bearer [token]

-   **Success Response:**
-   **Code:** 201  
    **Content:**

```json
{
    "code": 201,
    "status": "Created",
    "data": {
        "message" : "Device token saved successfully"
    },
    "meta": {
        "timestamp": datetime
    }
}
```


# PushButtonNotification


-   Notification Object

```json
{
    "id": integer,
    "userId": integer, // Foreign Key
    "type": "KEBAKARAN" | "BENCANA" | "RUSUH" ,
    "user" :{<user_object>},
    "createdAt": string, // Hidden
    "updatedAt": string // Hidden
}
```



