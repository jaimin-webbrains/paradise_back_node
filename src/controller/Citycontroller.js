const responseHandler = require("../handler/responsehandler");
const cityservices = require("../service/cityservice");
const MessageConstant = require("../constant/messageconstant");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

class CityController {
  constructor() { }
  async addCitydetails(req, res) {
    try {
      req
        .checkBody("city_name")
        .notEmpty()
        .withMessage("Please enter statename.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid zonename.")

      req
        .checkBody("state_id")
        .notEmpty()
        .withMessage("Please enter countryname.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const offerDetails = await cityservices.addCitydetails(req.body, res);
      if (offerDetails) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.ZONE_REGISTER_SUCCESS,
          offerDetails
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async editCitydetails(req, res) {
    try {
      req
        .checkBody("city_name")
        .notEmpty()
        .withMessage("Please enter statename.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid zonename.")

      req
        .checkBody("state_name")
        .notEmpty()
        .withMessage("Please enter countryname.")

      const errors = req.validationErrors();
      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const details = await cityservices.editCitydetails(req.params.id, req.body, res);
      if (details) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.ZONE_UPDATE_SUCCESS,
          details
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }
  async deleteCitydetails(req, res) {
    try {
      const detail = await cityservices.deleteCitydetails(req.params.id);
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
          MessageConstant.ZONE_DELETE_SUCCESS,
          detail
        );
      }

    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async getAlldetails(req, res) {
    try {
      let detail = await cityservices.getAlldetails(req.body)

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
          detail
        );
      }
    } catch (error) {

    }
  }
}

module.exports = new CityController();