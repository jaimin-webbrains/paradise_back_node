const mongoose = require("mongoose");
const PackageController = require("../controller/Packagecontroller");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const routes = (app) => {
  app.post("/package/add", auth ,upload.single("package_img"), PackageController.addPackageDetails);
  app.post("/package/edit/:id", auth, upload.single("package_img"),PackageController.editPackageDetails);
  app.delete("/package/delete/:id", auth, PackageController.deletePackagedetails);
  app.post("/package/alldetails", auth, PackageController.getAlldetails);
}

module.exports = routes;