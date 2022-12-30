const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const Offer = require("../modal/offer");

class OfferService {
  constructor() { }
  async addOfferdetails(payload, res) {
    try {
      let query = {
        offer_name: payload.offer_name
      };
      let offerData = await Offer.find(query);
      let data;
      if (offerData.length > 0) {
        return (data = "Zone already exists");
      }
      data = await Offer.create({
        offer_name: payload.offer_name,
      });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editOfferdetails(id, payload) {
    try {
      let data = await Offer.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
      );
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async deleteOfferdetails(id) {
    try {
      let data = await Offer.findByIdAndUpdate({ _id: id }, { is_delete: true }, { new: true });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getAlldetails() {
    try {
      let data = await Offer.find({ is_delete: false });
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new OfferService()