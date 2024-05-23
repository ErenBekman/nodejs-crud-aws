const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

/* REQUIRE */
require("./routes/index")(app);

/* 404 HANDLER */
app.use((req, res, next) => {
    const error = new Error("Page Not Found!");
    error.status = 404;
    next(error);
});
 
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

module.exports = app;
  