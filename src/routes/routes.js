const express = require("express");
const { handleGetDoctors, handleTimeSlot } = require("../controller/controller.doctor");
const {handleAppointment, handleAppointmentById, handleAddAppointment} = require("../controller/constroller.appointment");
const router = express.Router();






router.get("/doctors", handleGetDoctors);
router.get("/doctors/:id/slots", handleTimeSlot);

router.get("/appointment", handleAppointment);
router.get("/appointment/:id", handleAppointmentById);
router.post("/appointment", handleAddAppointment);

module.exports = router;
