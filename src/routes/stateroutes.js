const mongoose = require("mongoose");
const SatateController = require("../controller/Statecontroller");
const auth = require("../middleware/auth");

const routes = (app) => {
  app.post("/state/add", auth, SatateController.addStatedetails);
  app.post("/state/edit/:id", auth, SatateController.editStatedetails);
  app.delete("/state/delete/:id", auth, SatateController.deleteStatedetails);
  app.post("/state/alldetails", SatateController.getAlldetails);
  // app.get("/state/view/:id", auth, SatateController.viewStatedetails);
}

module.exports = routes;