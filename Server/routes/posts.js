const express = require("express");
const postsController = require("../controllers/posts");
const router = express.Router();

router.post("/add", postsController.insertPosts);

router.get("", postsController.getAllPosts);

// router.get("/getActiveBlogs", eventsController.getActiveBlog);

// router.get("/getMostViewedBlog", eventsController.getMostViewedBlog);

// router.get("/getLatestBlog", eventsController.getLatestBlog);

router.get("/:id", postsController.getSinglePosts);

router.put("/:id", postsController.updatePost);

// router.delete("/:id", eventsController.deleteblog);

router.post("/updateStatus/:id", postsController.updateStatus);

module.exports = router;
