const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const City = require("../modal/city");
const state = require("../modal/state");
const mongoose = require("mongoose")
// const ObjectId = require('mongodb').ObjectId;

class CityService {
  constructor() { }
  async addCitydetails(payload, res) {
    try {
      let query = {
        city_name: payload.city_name
      };
      let cityData = await City.find(query);
      let data;
      if (cityData.length > 0) {
        return (data = "City already exists");
      }
      data = await City.create({
        city_name: payload.city_name,
        state_id: payload.state_id,
        descreption: payload.descreption
      });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editCitydetails(id, payload, res) {
    try {
      let data = await City.findByIdAndUpdate(
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

  async deleteCitydetails(id) {
    try {
      let data = await City.findByIdAndUpdate({ _id: id }, { is_delete: true }, { new: true });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getAlldetails(payload) {
    try {
      console.log(payload);
      let options = {
        page: payload.page ? payload.page : 1,
        limit: payload.limit ? payload.limit : 10,
        sort: { created_at: -1 },
      };
      let search = new RegExp(payload.search, "i");

      let states = await state.find({ state_name: search });
      let state_ids = states.map(({ _id }) => _id);

      var query;
      query = {
        is_delete: false,
        $or: [
          { city_name: search },
          { state_id: { $in: state_ids } },
          { descreption: search },
        ]
      };
      let data = await City.paginate(query, options);
      console.log(data);
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new CityService()