const responseHandler = require("../handler/responsehandler");
const Packageservices = require("../service/packageservice");
const MessageConstant = require("../constant/messageconstant");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const packageservice = require("../service/packageservice");

class PackageController {
  constructor() { }
  async addPackageDetails(req, res) {

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

      // console.log("Erroe",errors);

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      // console.log(req.file,"req.body")
      const PackageDetails = await Packageservices.addPackageDetails(req.body,req.file.filename);
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
      // console.log("req",req.body,req.file,errors);


      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const PackageDetails = await Packageservices.editPackageDetails(req.body,req.file?.filename);
      // console.log(PackageDetails)
      if (PackageDetails) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.PACKAGE_UPDATE_SUCCESS,
          PackageDetails
        );
      }
    } catch (error) {
      console.log("erroe",error.message);

    }
  }
  async deletePackagedetails(req, res) {
    try {
      const detail = await packageservice.deletePackageDetails(req.params.id);
      if (!detail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.PACKAGE_DELETE_SUCCESS,
          detail
        );
      }

    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async getAlldetails(req, res) {
    // {console.log("req",req)}
    try {
      let detail = await packageservice.getAlldetails(req.body)
      // {console.log(detail,"detail");}

      if (!detail) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      // console.log(detail)

      if (detail) {
        return responseHandler.successResponse(
          res,
          200,
          "",
          detail
        );
      }
    } catch (error) {
console.log(error,"error")
    }
  }
}

module.exports = new PackageController();