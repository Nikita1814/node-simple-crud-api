# node-simple-crud-api
the following endpoints are available within the app:

GET api/users  giving a lis of usrs
GET api/users/{userId} getting a user by a uuid
POST api/users adding a user
PUT api/users/{userId} editing a user
DELETE api/users/{userId} deleting a user


the user object should look like this : 

{
	"userName": "Dean",
    "age": 32,
    "hobbies": ["family","women","alcohol"]
}

with age and userName being required for the user to be created