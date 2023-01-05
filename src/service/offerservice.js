const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const Offer = require("../modal/offer");
const mongoose = require("mongoose");
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
        return (data = "Offer already exists");
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

  async getAlldetails(payload) {
    try {
      let options = {
        page: payload.page ? payload.page : 1,
        limit: payload.limit,
        sort: { created_at: -1 },
      };
      var query;
      let search = payload.search;
      // if (search.length) {
      query = {
        is_delete: false,
        $or: [{ offer_name: { $regex: search, $options: "i" } }]
      };
      // } else {
      //   query = {};
      // }
      let data = await Offer.paginate(query, options);
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new OfferService()