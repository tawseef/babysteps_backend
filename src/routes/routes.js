const express = require("express");
const { handleGetDoctors, handleTimeSlot } = require("../controller/controller");
const router = express.Router();






router.get("/doctors", handleGetDoctors);
router.get("/doctors/:id/slots", handleTimeSlot);

module.exports = router;
