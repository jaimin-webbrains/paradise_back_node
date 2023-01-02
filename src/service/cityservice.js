const { LicenseManagerLinuxSubscriptions } = require("aws-sdk");
const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const City = require("../modal/city");

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
        state_name: payload.state_name,
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

  async getAlldetails() {
    try {
      let data = await City.find({ is_delete: false });
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new CityService()