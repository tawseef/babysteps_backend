const express = require("express");
const { handleGetDoctors, handleTimeSlot } = require("../controller/controller.doctor");
const {handleAppointment, handleAppointmentById, handleAddAppointment, handleUpdateAppointment, handleDeleteAppointment} = require("../controller/controller.appointment");
const router = express.Router();




router.get("/doctors", handleGetDoctors);
router.get("/doctors/:id/slots", handleTimeSlot);

router.get("/appointment", handleAppointment);
router.get("/appointment/:id", handleAppointmentById);
router.post("/appointment", handleAddAppointment);
router.put("/appointment", handleUpdateAppointment);
router.delete("/appointment", handleDeleteAppointment);

module.exports = router;
