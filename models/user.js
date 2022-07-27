const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : { 
		type : Boolean,
		default : false 
	},
	orders : [ 
		{
			products : [
				{
					productId : {
						type: String,
						required : [true, "Product Id is required"]
					},
					productName : {
						type: String,
						required : [true, "Product name is required"]
					},
					quantity : {
						type: Number,
						required : [true, "Product quantity is required"]
					}
				}
			],
			totalAmount : {
				type: Number,
				required : [true, "Total amount is required"]
			},
			purchasedOn : {
				type : Date,
				default : new Date()
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);
//module.exports allows us to use the file as a module, similar to packages, and can be used by other files