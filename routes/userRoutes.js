//setup the dependencies
const express = require("express");
const router = express.Router();
const auth = require("../auth");
const userController = require("../controllers/userController");

router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(false);
	} else {
		userController.setAsAdmin(req.params.userId).then(resultFromController => res.send(resultFromController));
	}
})

router.post("/checkout", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin === true) {
		res.send(false);
	} else {
		const userId = auth.decode(req.headers.authorization).id;
		userController.checkout(userId, req.body).then(resultFromController => res.send(resultFromController));
	}
})
router.get("/myOrders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin === true) {
		res.send(false);
	} else {
		userController.getMyOrders(userData.id).then(resultFromController => res.send(resultFromController));
	}
})

router.get("/orders", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);

	if(userData.isAdmin === false) {
		res.send(false);
	} else {
		userController.getAllOrders().then(resultFromController => res.send(resultFromController));
	}
})

router.get("/details", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));
})

module.exports = router;