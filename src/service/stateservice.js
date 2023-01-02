const { LicenseManagerLinuxSubscriptions } = require("aws-sdk");
const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
require("../modal/state")
const State = require("../modal/state");

class StateService {
  constructor() { }
  async addStatedetails(payload, res) {
    try {
      let query = {
        state_name: payload.state_name
      };
      let stateData = await State.find(query);
      let data;
      if (stateData.length > 0) {
        return (data = "State already exists");
      }
      data = await State.create({
        state_name: payload.state_name,
        country_name: payload.country_name,
        zone_name: payload.zone_name,
        descreption: payload.descreption
      });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editStatedetails(id, payload, res) {
    try {
      let data = await State.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      // console.log(data);
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteStatedetails(id) {
    try {
      let data = await State.findByIdAndUpdate({ _id: id }, { is_delete: true }, { new: true });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getAlldetails() {
    try {
      let data = await State.find({ is_delete: false });
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new StateService()