const mongoose = require("mongoose");
const SatateController = require("../controller/Statecontroller");
const auth = require("../middleware/auth");

const routes = (app) => {
  app.post("/state/add", auth, SatateController.addStatedetails);
  app.post("/state/edit/:id", auth, SatateController.editStatedetails);
  app.delete("/state/delete/:id", auth, SatateController.deleteStatedetails);
  app.get("/state/alldetails", auth, SatateController.getAlldetails);
}

module.exports = routes;