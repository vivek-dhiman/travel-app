const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const timeSlot = require('../models/timeSlot');
/*
    @usage : to add a time slot
    @url : /api/timeSlots/add
    @fields : userId, date, timeSlot, notes, travelAgentId
    @method : POST
    @access : PRIVATE
 */
router.post(
  "/add", authenticate,
  async (request, response) => {
    try {
      console.log(request);
      let userId = request.user.id;
      let timeSlotInfo = request.body.timeSlotInfo;
      let newTimeSlot={
        travelAgentId:userId,
        timeSlotInfo:timeSlotInfo
      };
      let timeSlotObject = new timeSlot(newTimeSlot);
      timeSlotObject = await timeSlotObject.save();
      response.status(200).json({ timeSlotObject: timeSlotObject });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

router.get(
  "/", authenticate,
  async (request, response) => {
    try {
      console.log(request);
      let timeSlots = await timeSlot.find();
      if (!timeSlots) {
        return response.status(400).json({ errors: [{ msg: "No Posts Found" }] });
      }
      response.status(200).json({ timeSlots: timeSlots });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
