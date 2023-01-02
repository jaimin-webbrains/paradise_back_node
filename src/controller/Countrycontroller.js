const responseHandler = require("../handler/responsehandler");
const countryservices = require("../service/countryservice");
const MessageConstant = require("../constant/messageconstant");
const country = require("../modal/country");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

class CountryController {
  constructor() { }
  async addCountrydetails(req, res) {
    try {
      req
        .checkBody("country_name")
        .notEmpty().trim()
        .withMessage("Please enter country name.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a country name.")

      req
        .checkBody("is_national")
        .notEmpty()
        .withMessage("Please select is national.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const countryDetails = await countryservices.addCountrydetails(req.body, res);
      if (countryDetails) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.COUNTRY_REGISTER_SUCCESS,
          countryDetails
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async editCountrydetails(req, res) {
    try {
      req
        .checkBody("country_name")
        .notEmpty().trim()
        .withMessage("Please enter country name.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a country name.")

      req
        .checkBody("is_national")
        .notEmpty()
        .withMessage("Please select is national.")


      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      const details = await countryservices.editCountrydetails(req.params.id, req.body);

      if (details === "Country already exists") {
        return responseHandler.errorResponse(
          res,
          200,
          details,
          []
        );
      }

      if (details) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.COUNTRY_UPDATE_SUCCESS,
          details
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }
  async deleteCountrydetails(req, res) {
    try {
      const detail = await countryservices.deleteCountrydetails(req.params.id);
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
          MessageConstant.COUNTRY_DELETE_SUCCESS,
          detail
        );
      }

    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async getAlldetails(req, res) {
    try {
      let detail = await countryservices.getAlldetails(req.body)

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
          "",
          detail
        );
      }
    } catch (error) {

    }
  }
}

module.exports = new CountryController();