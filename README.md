- Node.js + TypeScript
- Authentication/Authorization via JWT
- MongoDB

API Methods:

GET https://enigmatic-mountain-35900.herokuapp.com/stats
Authorization: <string> ('Bearer <token>')
  
###

POST https://enigmatic-mountain-35900.herokuapp.com/login
Content-Type: application/json

{
    "login": "<string>",
    "password": "<string>"
}

###

POST https://enigmatic-mountain-35900.herokuapp.com/signup
Content-Type: application/json

{
    "login": "<string>",
    "password": "<string>"
}

###

POST https://enigmatic-mountain-35900.herokuapp.com/token
Content-Type: application/json

{
    "token": "<string>"
}

###

DELETE https://enigmatic-mountain-35900.herokuapp.com/logout
Content-Type: application/json

{
    "token": "string"
}

