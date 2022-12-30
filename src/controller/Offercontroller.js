const responseHandler = require("../handler/responsehandler");
const offerservices = require("../service/offerservice");
const MessageConstant = require("../constant/messageconstant");
const offer = require("../modal/offer");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

class OfferController {
  constructor() { }
  async addOfferdetails(req, res) {
    try {
      req
        .checkBody("offer_name")
        .notEmpty()
        .withMessage("Please enter zone zonename.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid zonename.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const offerDetails = await offerservices.addOfferdetails(req.body, res);
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
  async editOfferdetails(req, res) {
    try {
      req
        .checkBody("offer_name")
        .notEmpty()
        .withMessage("Please enter offername")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }

      const details = await offerservices.editOfferdetails(req.params.id, req.body);

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
  async deleteOfferdetails(req, res) {
    try {
      const detail = await offerservices.deleteOfferdetails(req.params.id);
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
      let detail = await offerservices.getAlldetails()

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

module.exports = new OfferController();