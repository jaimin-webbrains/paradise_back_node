const mongoose = require("mongoose");
const PackageController = require("../controller/Packagecontroller");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const routes = (app) => {
  app.post("/package/add", auth, upload.single("package_img"), PackageController.allPackageDetails);
  app.post("/package/edit", auth, PackageController.editPackageDetails);
  app.post("/package/alldetails", auth, PackageController.allDetails)
}

module.exports = routes;