const jwt = require("jsonwebtoken");
// The "secret" keyword/string can be any string value that will be used in encrypting the user information into a JWT token
const secret = "CourseBookingAPI";

// [Section] JSON Web Token
/*
- JSON Web Token or JWT is a way of securely passing information via requests
- Information is kept secure by converting sensitive information into a string composing normally of alphanumeric and special characters that are encrypted along with the secret keyword
- Only the system/application that has access to the secret keyword/string can decrypt the information

- Imagine JWT as a gift wrapping service but with a lock
- Only the person who knows the lock's code can open the gift
- And if the wrapper has been tampered with, JWT also recognizes this and disregards the gift
- This ensures that the data is secure from the sender to the receiver
*/

// [Section] Token Creation
/*
-  Analogy: 
	- Pack the gift
	- Add a lock using the secret keyword/string as the passcode
*/
module.exports.createAccessToken = (user) => {

	// The data comes from the "user" parameter from the "login" page
	// When the user logs in, a token will be created with data containing the user's information
	// We can add as much information as we need when creating a JWT
	const data = {
		id : user._id,
		email : user.email,
		isAdmin : user.isAdmin
	}

	// Creates the token and using the "sign" method
	// Create a JSON web token from the user data with secret keyword/string and no additional parameters 
	return jwt.sign(data, secret, {});
	
}


// [Section] Token Verification
/* 
- Analogy: 
	- Receive the gift 
	- Verify if the sender is legitimate and the gift was not tampered with
- The "next" parameter is a method that will be used to tell the server to proceed if the verification is okay and passes the information to the next middleware/callback function in the route
*/
module.exports.verify = (req, res, next) => {

	// We put the JWT in the headers of the request
	// In Postman, this can be found under Authorization > select "Bearer Token" > Token value
	let token = req.headers.authorization;

	// If the token is present
	if(typeof token !== "undefined"){ 

		// Checks for the token received
		console.log(token);

		// Slices off the JWT from the authorization property from the header of the request
		// The token sent from the request will contain a "Bearer " as a part of the header request
			// ex. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTI4YmJmNzJmYTA1MDAwNDY0YzJlYiIsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjMwOTI2NTc2fQ.1E_Zxg8x_h-mlvdwKThbZaWJC3fa3SdLaOswnevyrBc
		// We only need the token without the "Bearer" and space prefix received from the frontend
		token = token.slice(7, token.length);

		// Uses jwt's "verify" method to check the validity of the token using the secret keyword/string
		// Fails if the token's secret keyword/string does not match the secret keyword/string in the application, meaning the token has been tampered with
		
		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				return res.send({auth : "failed"});
			} else {

				// The "next" method tells the server to pass the user information to the next middleware/callback function in the route and  allow us to proceed with the next request
				next();

			}
		});

	// If the token is not present
	} else { 
		return res.send({auth : "failed"});
	};

};

// [Section] Token Decryption 
/*
- Analogy
	- Open the gift and get the content
*/
module.exports.decode = (token) => {

	// Check if the token is present of not
	if(typeof token !== "undefined"){ 

		// Grab the JWT from the request header
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if (err){
				return null
			} else {
				// The "decode" method decodes the token and gets the payload/data stored in the token
				return jwt.decode(token, {complete:true}).payload
			}
		})

	// No token is received
	} else { 
		return null
	}
}
