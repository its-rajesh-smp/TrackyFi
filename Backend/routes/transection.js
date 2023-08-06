const express = require("express");
const transectionController = require("../controllers/transection");
const router = express.Router();

router.post("/transections/add", transectionController.add);
router.get("/transections/get/:limit/:skip", transectionController.get);
router.patch("/transections/edit", transectionController.edit);
router.post("/transections/delete", transectionController.delete);

module.exports = router;
