const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const userRoutes = require("./routes/user");
const EventsRoutes = require("./routes/events");
const MembersRoutes = require("./routes/members");
const PostsRoutes = require("./routes/posts");
// const contriesRoutes = require("./routes/contries");
// const regionRoutes = require("./routes/region");
// const cityRoutes = require("./routes/City");
// const UserRoutes = require("./routes/user");
// const VideoRoutes = require("./routes/video");
// const PageManagerRouters = require("./routes/pagemanager");

const app = express();

// mongoose
//   .connect(
//     "mongodb+srv://swapnil:" +
//       process.env.MONGO_ATLAS_PW +
//       "@cluster0.r1ndr.mongodb.net/travellerStoriesdb",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

//MyM0ng0DBPassw0rd
//mongodb+srv://swapnil:M7M0n90D8P@zzw0rd@cluster0.r1ndr.mongodb.net/travellerStoriesdb

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB&ssl=false",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.use("/api/subcategory", SubCategoryRoutes);
// app.use("/api/user", userRoutes);
app.use("/api/events", EventsRoutes);
app.use("/api/members", MembersRoutes);
app.use("/api/posts", PostsRoutes);
// app.use("/api/countries", contriesRoutes);
// app.use("/api/regions", regionRoutes);
// app.use("/api/cities", cityRoutes);
// app.use("/api/User", UserRoutes);
// app.use("/api/video", VideoRoutes);
// app.use("/api/PageManager", PageManagerRouters);

module.exports = app;
