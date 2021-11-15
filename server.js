const express = require("express");
const connectLivereload = require("connect-livereload");

const app = express();

app.use(connectLivereload());

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("App is runnig");
});
