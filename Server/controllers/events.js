const EventData = require("../models/events");

exports.insertEvent = (req, res, next) => {
  //console.log(req.body);
  const eventData = new EventData({
    EventName: req.body.EventName,
    EventDescription: req.body.EventDescription,
    IsActive: req.body.IsActive,
    EnteredBy: req.body.EnteredBy,
    WhenEntered: req.body.WhenEntered,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });

  eventData
    .save()
    .then((result) => {
      //console.log(result);
      res.status(200).json({
        message: "Blog created!",
        result: result,
      });
    })
    .catch((err) => {
      //console.log(err);
      res.status(500).json({
        message: "Some error Occurd",
      });
    });

  // res.status(200).json({
  //   message: "Some error Occurd",
  // });
};

exports.getAllEvent = (req, res, next) => {
  const eventData = EventData.find({});

  eventData
    .then((documents) => {
      fetchedData = documents;
      return EventData.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Blogs fetched successfully!",
        Data: fetchedData,
        maxData: count,
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Fetching Categpry failed!",
      });
    });
};

exports.deleteblog = (req, res, next) => {
  //console.log(req.params.id);
  BlogData.deleteOne({
    _id: req.params.id,
    EnteredBy: req.userLogedData.UserID,
  })
    .then((result) => {
      //console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
};

exports.updateEvent = (req, res, next) => {
  console.log(req.body);
  const eventData = new EventData({
    _id: req.body._id,
    EventName: req.body.EventName,
    EventDescription: req.body.EventDescription,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });
  //console.log(subcategory);
  EventData.updateOne({ _id: req.params.id }, eventData)
    .then((result) => {
      //console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate post!",
      });
    });
};

exports.getSingleEvent = (req, res, next) => {
  const eventData = EventData.findById(req.params.id);

  eventData
    .then((documents) => {
      if (documents) {
        res.status(200).json({
          message: "tips fetched successfully!",
          Data: documents,
        });
      } else {
        res.status(404).json({ message: "tips not found!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Fetching Categpry failed!",
      });
    });
};

exports.getActiveEvents = (req, res, next) => {
  const blogData = EventData.find({ IsActive: true }).sort({ WhenEntered: -1 });
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.currentpage;
  if (pageSize && currentPage) {
    blogData.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  blogData
    .populate("EnteredBy")
    .populate("CityID")
    .then((documents) => {
      fetchedData = documents;
      return EventData.find({ IsActive: true }).countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Blogs fetched successfully!",
        Data: fetchedData,
        maxData: count,
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(500).json({
        message: "Fetching Blogs failed!",
      });
    });
};

exports.getMostViewedBlog = (req, res, next) => {
  const blogData = BlogData.find({ IsActive: true })
    .sort({ WhenEntered: 1 })
    .limit(10);

  blogData
    .populate("EnteredBy")
    .populate("CityID")
    .then((documents) => {
      res.status(200).json({
        message: "Blogs fetched successfully!",
        blogData: documents,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Fetching Blogs failed!",
      });
    });
};

exports.getLatestBlog = (req, res, next) => {
  const blogData = BlogData.find({ IsActive: true }).sort({ WhenEntered: 1 });
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.currentpage;
  if (pageSize && currentPage) {
    blogData.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  blogData
    .populate("EnteredBy")
    .populate("CityID")
    .then((documents) => {
      res.status(200).json({
        message: "Blogs fetched successfully!",
        blogData: documents,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Fetching Blogs failed!",
      });
    });
};

exports.updateStatus = (req, res, next) => {
  //console.log(req.body);
  const eventData = new EventData({
    _id: req.body._id,
    IsActive: req.body.IsActive,
    ModifiedBy: req.body.ModifiedBy,
    WhenModified: req.body.WhenModified,
  });
  EventData.updateOne({ _id: req.params.id }, eventData)
    .then((result) => {
      if (result.nModified > 0) {
        //console.log("Update successful!");
        res.status(200).json({ message: "Update successful!" });
      } else {
        //console.log("Not authorized!");
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      //console.log("Couldn't udpate post! " + error);
      res.status(500).json({
        message: "Couldn't udpate post!",
      });
    });
};
