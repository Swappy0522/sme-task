const express = require("express");
const eventsController = require("../controllers/events");
const router = express.Router();

router.post("/addEvent", eventsController.insertEvent);

router.get("", eventsController.getAllEvent);

router.get("/getActiveEvents", eventsController.getActiveEvents);

// router.get("/getMostViewedBlog", eventsController.getMostViewedBlog);

// router.get("/getLatestBlog", eventsController.getLatestBlog);

router.get("/:id", eventsController.getSingleEvent);

router.put("/:id", eventsController.updateEvent);

// router.delete("/:id", eventsController.deleteblog);

router.post("/updateStatus/:id", eventsController.updateStatus);

module.exports = router;
