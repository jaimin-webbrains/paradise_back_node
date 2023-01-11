const responseHandler = require("../handler/responsehandler");
const stateservices = require("../service/stateservice");
const MessageConstant = require("../constant/messageconstant");
const offer = require("../modal/offer");
const messages = require("../helper/messages");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

class StateController {
  constructor() { }
  async addStatedetails(req, res) {
    try {
      req
        .checkBody("state_name")
        .notEmpty()
        .withMessage("Please enter statename.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid zonename.")

      req
        .checkBody("country_id")
        .notEmpty()
        .withMessage("Please enter countryname.")

      req
        .checkBody("zone_id")
        .notEmpty()
        .withMessage("Please enter zonename.")

      const errors = req.validationErrors();

      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const offerDetails = await stateservices.addStatedetails(req.body, res);
      console.log("offerDetails",offerDetails);
      if (offerDetails) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.STATE_REGISTER_SUCCESS,
          offerDetails
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async editStatedetails(req, res) {
    try {
      req
        .checkBody("state_name")
        .notEmpty()
        .withMessage("Please enter statename.")
        .matches(/^[a-zA-Z][a-zA-Z ]*$/)
        .withMessage("Please enter a valid zonename.")

      req
        .checkBody("country_id")
        .notEmpty()
        .withMessage("Please enter countryname.")

      req
        .checkBody("zone_id")
        .notEmpty()
        .withMessage("Please enter zonename.")

      const errors = req.validationErrors();
      if (errors) {
        return responseHandler.errorResponse(
          res,
          400,
          MessageConstant.SOMETHING_WRONG,
          []
        );
      }
      const details = await stateservices.editStatedetails(req.params.id, req.body, res);
      if (details) {
        return responseHandler.successResponse(
          res,
          200,
          MessageConstant.STATE_UPDATE_SUCCESS,
          details
        );
      }
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }
  async deleteStatedetails(req, res) {
    try {
      const detail = await stateservices.deleteStatedetails(req.params.id);
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
          MessageConstant.STATE_DELETE_SUCCESS,
          detail
        );
      }

    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
  async getAlldetails(req, res) {
    // console.log("req",req.body)
    // console.log("res123",res);  
  
    try {
      const detail = await stateservices.getAlldetails(req.body)
      // console.log("detsaasassaail",detail);

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

  // async viewStatedetails(req, res) {
  //   try {
  //     const detail = await stateservices.viewStatedetails(req.params.id);

  //     if (!detail) {
  //       return responseHandler.errorResponse(
  //         res,
  //         400,
  //         MessageConstant.SOMETHING_WRONG,
  //         []
  //       );
  //     }

  //     if (detail) {
  //       return responseHandler.successResponse(res, 200, "", detail);
  //     }
  //   } catch (error) {
  //     responseHandler.errorResponse(res, 400, error.message, []);
  //   }
  // }
}

module.exports = new StateController();