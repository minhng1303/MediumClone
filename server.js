const express = require("express");
const mongooose = require("mongoose");
const postRoute = require("./routes/post.route");
const tagRoute = require("./routes/tag.route");
const authorRoute = require("./routes/author.route");
const HttpError = require('./models/http-error');



require("dotenv/config");
const app = express();
const URL = process.env.URL;
const multer = require("multer");
const path = require("path");

// read body message from user -> req.body
// form data 
app.use(express.urlencoded({ extended: true }));
// json
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now().toString() + file.originalname);
  },
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(multer({ storage: storage }).single("image"));
app.use(express.urlencoded({ extended: true }));

mongooose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("App is running");
    });
  });

app.use(postRoute);
app.use(tagRoute);
app.use(authorRoute);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route!', 404);
  throw error;
})
