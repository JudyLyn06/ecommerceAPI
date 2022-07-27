const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../auth");

router.get("/all", (req, res) => {
	productController.getAll().then(resultFromController => res.send(resultFromController));
})

router.get("/active", (req, res) => {
	productController.getAllActive().then(resultFromController => res.send(resultFromController));
})

router.post("/", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(false);
	} else {
		productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
	}
})

router.get("/:productId", (req, res) => {
	productController.getProduct(req.params.productId).then(resultFromController => res.send(resultFromController))
})

router.put("/:productId", auth.verify, (req, res) => {
	if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(false);
	} else {
		productController.updateProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController))
	}
})

router.put("/:productId/archive", auth.verify, (req, res) => { //need for middleware
	if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(false);
	} else {
		productController.archiveProduct(req.params.productId).then(resultFromController => res.send(resultFromController))
	}
})

router.put("/:productId/activate", auth.verify, (req, res) => { //need for middleware
	if(auth.decode(req.headers.authorization).isAdmin === false) {
		res.send(false);
	} else {
		productController.activateProduct(req.params.productId).then(resultFromController => res.send(resultFromController))
	}
})

module.exports = router;
