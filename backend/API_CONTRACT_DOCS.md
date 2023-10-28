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
    "NIP": string,
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

## **POST** /api/users/approve

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
