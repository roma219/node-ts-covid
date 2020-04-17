- Node.js + TypeScript
- Authentication/Authorization via JWT
- MongoDB

API Methods:

GET https://enigmatic-mountain-35900.herokuapp.com/stats
Authorization: <string> ('Bearer <token>')
  
###

POST https://enigmatic-mountain-35900.herokuapp.com/login

{
    "login": "<string>",
    "password": "<string>"
}

###

POST https://enigmatic-mountain-35900.herokuapp.com/signup

{
    "login": "<string>",
    "password": "<string>"
}

###

POST https://enigmatic-mountain-35900.herokuapp.com/token

{
    "token": "<string>"
}

###

DELETE https://enigmatic-mountain-35900.herokuapp.com/logout

{
    "token": "string"
}

