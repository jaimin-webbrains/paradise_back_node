const responseHandler = require("../handler/responsehandler");
const Packageservices = require("../service/packageservice");
const MessageConstant = require("../constant/messageconstant");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");

class PackageController {
  constructor() { }
  async allPackageDetails(req, res) {
    try {
      req
        .checkBody("package_name")
        .notEmpty()
        .withMessage("Please enter packagename.")
      req
        .checkBody("price")
        .notEmpty()
        .withMessage("Please enter package price.")
      req
        .checkBody("number_of_years")
        .notEmpty()
        .withMessage("Please enter package years.")
      req
        .checkBody("amc")
        .notEmpty()
        .withMessage("Please enter package amc.")
      req
        .checkBody("night")
        .notEmpty()
        .withMessage("Please enter package night.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const PackageDetails = await Packageservices.allPackageDetails(req.body, res);
      console.log(PackageDetails)
      if (PackageDetails) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.PACKAGE_REGISTER_SUCCESS,
          PackageDetails
        );
      }
    } catch (error) {

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

module.exports = new PackageController();