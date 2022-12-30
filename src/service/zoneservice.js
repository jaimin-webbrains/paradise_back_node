const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const Zone = require("../modal/zone");

class ZoneService {
  constructor() { }
  async addZonedetails(payload, res) {
    try {
      let query = {
        zone_name: payload.zone_name
      };
      let zoneData = await Zone.find(query);
      let data;
      if (zoneData.length > 0) {
        return (data = "Zone already exists");
      }
      data = await Zone.create({
        zone_name: payload.zone_name,
      });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editZonedetails(id, payload) {
    try {
      let data = await Zone.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteZonedetails(id) {
    try {
      let data = await Zone.findByIdAndUpdate({ _id: id }, { is_delete: true }, { new: true });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getAlldetails() {
    try {
      let data = await Zone.find({});
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new ZoneService()