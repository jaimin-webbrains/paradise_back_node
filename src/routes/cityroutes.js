const mongoose = require("mongoose");
const CityController = require("../controller/Citycontroller");
const auth = require("../middleware/auth");

const routes = (app) => {
  app.post("/city/add", auth, CityController.addCitydetails);
  app.post("/city/edit/:id", auth, CityController.editCitydetails);
  app.delete("/city/delete/:id", auth, CityController.deleteCitydetails);
  app.post("/city/alldetails", auth, CityController.getAlldetails);
}

module.exports = routes;