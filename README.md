- Node.js + TypeScript
- Authentication/Authorization via JWT
- MongoDB

API URL:
https://enigmatic-mountain-35900.herokuapp.com

API Methods:

GET /stats
Authorization: <string> ('Bearer <token>')
  
###

POST /login

{
    "login": "<string>",
    "password": "<string>"
}

###

POST /signup

{
    "login": "<string>",
    "password": "<string>"
}

###

POST /token

{
    "token": "<string>"
}

###

DELETE /logout

{
    "token": "string"
}

