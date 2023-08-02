const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

/*
    @usage : to make an Appointment
    @url : /api/appointment
    @fields : userId, date, timeSlot, notes, travelAgentId
    @method : POST
    @access : PRIVATE
 */
router.post(
  "/appointment", authenticate, 
  async (request, response) => {
    try {
      let { userId, date, timeSlot, notes, travelAgentId  } = request.body;

      let appointment = new Appointment({ userId, date, timeSlot, notes, travelAgentId });
      await appointment.save();
      response.status(200).json({ msg: "Appointment created successfully!" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/*
    @usage :  to get user appointments
    @url : /api/my-appointments
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get("/my-appointments", authenticate, async (request, response) => {
  try {
    let appointments = await User.findById(request.user.id).select("appointments");
    response.status(200).json({
      appointments: appointments,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

module.exports = router;
