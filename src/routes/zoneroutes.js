const mongoose = require("mongoose");
const ZoneController = require("../controller/Zonecontroller");
const auth = require("../middleware/auth");

const routes = (app) => {
  app.post("/zone/add", auth, ZoneController.addZonedetails);
  app.post("/zone/edit/:id", auth, ZoneController.editZonedetails);
  app.delete("/zone/delete/:id", auth, ZoneController.deleteZonedetails);
  app.get("/zone/alldetails", auth, ZoneController.getAlldetails);
}

module.exports = routes;