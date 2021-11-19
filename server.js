const express = require("express");
const mongooose = require("mongoose");
const postRoute = require("./routes/post.route");
require("dotenv/config");
const app = express();
const URL = process.env.URL;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongooose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("App is runnig");
    });
  });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

app.use(postRoute);
