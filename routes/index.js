module.exports = function (app) {
  require("./auth")(app);
  require("./book")(app);
  require("./category")(app);

  app.get("/", function (req, res) {
    res.send("Nodejs CRUD API with DynamoDB and Serverless Framework");
  });
};
