const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const Package = require("../modal/package");
const mongoose = require("mongoose")
// const ObjectId = require('mongodb')

class PackageServices {
  constructor() { }
  async allPackageDetails(payload, res) {
    try {
      let query = {
        package_name: payload.package_name
      };
      let packageData = await Package.find(query);
      let data;
      if (packageData.length > 0) {
        return (data = "Package already exists");
      }
      data = await Package.create({
        package_name: payload.package_name,
        price: payload.price,
        number_of_years: payload.number_of_years,
        amc: payload.amc,
        night: payload.night,
        descreption: payload.descreption,
        package_img: payload.package_img
      });
      console.log(data)
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editPackageDetails(req, res) {
    try {

    } catch (error) {

    }
  }
  async allDetails(req, res) {
    try {

    } catch (error) {

    }
  }
}

module.exports = new PackageServices();