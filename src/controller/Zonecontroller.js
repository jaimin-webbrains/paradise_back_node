const responseHandler = require("../handler/responsehandler");
const zoneservices = require("../service/zoneservice");
const MessageConstant = require("../constant/messageconstant");
const zone = require("../modal/zone");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

class ZoneController {
  constructor() { }
  async addZonedetails(req, res) {
    try {
      req
        .checkBody("zone_name")
        .notEmpty().trim()
        .withMessage("Please enter zone name.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid name.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const zoneDetails = await zoneservices.addZonedetails(req.body, res);
      if (zoneDetails) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.ZONE_REGISTER_SUCCESS,
          zoneDetails
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async editZonedetails(req, res) {
    try {
      req
        .checkBody("zone_name")
        .notEmpty().trim()
        .withMessage("Please enter zone name")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid zone name.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      const details = await zoneservices.editZonedetails(req.params.id, req.body);

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
  async deleteZonedetails(req, res) {
    try {
      const detail = await zoneservices.deleteZonedetails(req.params.id);
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
      let detail = await zoneservices.getAlldetails(req.body)

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

module.exports = new ZoneController();