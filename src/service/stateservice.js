const { LicenseManagerLinuxSubscriptions } = require("aws-sdk");
const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
require("../modal/state")
const State = require("../modal/state");
const mongoose = require("mongoose")
const country = require("../modal/country");
const zone = require("../modal/zone");

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

  async getAlldetails(payload) {
    try {
      let options = {
        page: payload.page ? payload.page : 1,
        limit: payload.limit ? payload.limit : 10,
        sort: { created_at: -1 },
      };
      let search = new RegExp(payload.search, "i");

      let countries = await country.find({ country_name: search });
      let country_ids = countries.map(({ _id }) => _id);
      console.log(country_ids)
      let zones = await zone.find({ zone_name: search });
      let zone_ids = zones.map(({ _id }) => _id);

      console.log(zone_ids)

      var query;
      query = {
        is_delete: false,
        $or: [
          { state_name: search },
          { country_id: { $in: country_ids } },
          { zone_id: { $in: zone_ids } },
          { descreption: search },
        ]
      };
      let data = await State.paginate(query, options);
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new StateService()