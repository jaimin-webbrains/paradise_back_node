const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const Country = require("../modal/country");

class CountryService {
  constructor() { }
  async addCountrydetails(payload, res) {
    try {
      let query = {
        country_name: payload.country_name
      };
      let countryData = await Country.find(query);
      let data;
      if (countryData.length > 0) {
        return (data = "Country already exists");
      }
      data = await Country.create({
        country_name: payload.country_name,
        is_national: payload.is_national,
        descreption: payload.descreption
      });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editCountrydetails(id, payload) {
    let query = {
      country_name: payload.country_name
    };
    let data;
    let countryData = await Country.find(query);
    if (countryData.length > 0) {
      return (data = "Country already exists");
    }
    try {
       data = await Country.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteCountrydetails(id) {
    try {
      let data = await Country.findByIdAndUpdate({ _id: id }, { is_delete: true }, { new: true });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getAlldetails() {
    try {
      let data = await Country.find({ is_delete: false });
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new CountryService()