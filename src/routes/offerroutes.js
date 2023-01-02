const mongoose = require("mongoose");
const OfferController = require("../controller/Offercontroller");
const auth = require("../middleware/auth");

const routes = (app) => {
  app.post("/offer/add", auth, OfferController.addOfferdetails);
  app.post("/offer/edit/:id", auth, OfferController.editOfferdetails);
  app.delete("/offer/delete/:id", auth, OfferController.deleteOfferdetails);
  app.post("/offer/alldetails", auth, OfferController.getAlldetails);
}

module.exports = routes;