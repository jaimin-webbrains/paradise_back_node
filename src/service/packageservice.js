const MessageConstant = require("../constant/messageconstant");
const responseHandler = require("../handler/responsehandler");
const Package = require("../modal/package");
const mongoose = require("mongoose");
// const ObjectId = require('mongodb')

class PackageServices {
  constructor() { }
  async addPackageDetails(payload,filename, res) {
    // console.log("payload",payload);
    try {
      let query = {
        package_name: payload.package_name
      };
      let packageData = await Package.find(query);
      let data;
      if (packageData.length > 0) {
        return (data = "Package already exists");
      }
      data = await Package.create({
        package_name: payload.package_name,
        price: payload.price,
        number_of_years: payload.number_of_years,
        amc: payload.amc,
        night: payload.night,
        descreption: payload.descreption,
        package_img: filename
      });
      // console.log(data)
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, [])
    }
  }

  async editPackageDetails(payload,filename, res) {
    // const payload = req.body
    payload.package_img = filename ? filename : payload.package_img
    const id = payload._id
    // console.log("id",id,payload);
    let query = {
      package_name: payload.package_name,
      _id:{$ne:id}
    };
    let packageData = await Package.find(query);
    let data;
    if (packageData.length > 0) {
      return (data = "Package already exists");
    }

    try {
      let data = await Package.findByIdAndUpdate(
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

  async deletePackageDetails(id) {
    try {
      let data = await Package.findByIdAndDelete({ _id: id }, { new: true });
      return data
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }

  async getAlldetails(payload,res) {
    // console. ("payload",payload);
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
        $or: [{ package_name: { $regex: search, $options: "i" } },
        // { price: { $regex: search, $options: "i" } },
        // { number_of_years: { $regex: search, $options: "i" } },
        // { amc: { $regex: search, $options: "i" } },
        // { night: { $regex: search, $options: "i" } },
        { descreption: { $regex: search, $options: "i" } },
      ]
      };
      // } else {
      // query = {};
      // }
      let data = await Package.paginate(query, options);
      // console.log(data);
      return data;
    } catch (error) {
      responseHandler.errorResponse(res, 400, error.message, []);
    }
  }
}

module.exports = new PackageServices();