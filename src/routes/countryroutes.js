const mongoose = require("mongoose");
const CountryController = require("../controller/Countrycontroller");
const auth = require("../middleware/auth");

const routes = (app) => {
  app.post("/country/add", auth, CountryController.addCountrydetails);
  app.post("/country/edit/:id", auth, CountryController.editCountrydetails);
  app.delete("/country/delete/:id", auth, CountryController.deleteCountrydetails);
  app.get("/country/alldetails", auth, CountryController.getAlldetails);
}

module.exports = routes;