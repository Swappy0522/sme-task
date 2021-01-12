const express = require("express");
const membersController = require("../controllers/members");
const router = express.Router();

router.post("/add", membersController.insertMember);

router.get("", membersController.getAllMembers);

// router.get("/getActiveBlogs", eventsController.getActiveBlog);

// router.get("/getMostViewedBlog", eventsController.getMostViewedBlog);

// router.get("/getLatestBlog", eventsController.getLatestBlog);

router.get("/:id", membersController.getSingleMember);

router.put("/:id", membersController.updateMember);

// router.delete("/:id", eventsController.deleteblog);

router.post("/updateStatus/:id", membersController.updateStatus);

module.exports = router;
