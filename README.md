- Node.js + TypeScript
- Authentication/Authorization via JWT
- MongoDB

##### API URL:
https://enigmatic-mountain-35900.herokuapp.com

##### API Methods:
#### Fetch stats
Returns json data with stats by country.

* **URL**
```
/stats
```
* **Method:**

```
GET
```

* **Headers:**
```
Authorization: <string> ('Bearer <token>')
```

* **Response:**
```
[{
    name: <string>,
    totalCases: <string>
    totaDeaths: <string>
}]
```

----
#### Login
Logs in user via login & password, response with accessToken and refreshToken

* **URL**
```
/login
```
* **Method:**

```
POST
```

* **Body:**
```
{
    login: <string>,
    password: <string>
}
```

* **Response:**
```
{
    accessToken: <string>,
    refreshToken: <string>
}
```


----
#### Sign up
Signs up with login & password provided

* **URL**
```
/signup
```
* **Method:**

```
POST
```
* **Body:**
```
{
    login: <string>,
    password: <string>
}
```

----
#### Refresh token
Uses refresh token to get new authorization token

* **URL**
```
/token
```
* **Method:**
```
POST
```
* **Body:**
```
{
    "token": "<string>"
}
```

----
#### Log out
Logs user out

* **URL**
```
/signup
```
* **Method:**

```
DELETE
```
* **Body:**
```
{
    "token": "<string>"
}
```
