const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2")

const PackageSchema = new Schema({
  package_name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  number_of_years: {
    type: Number,
    trim: true,
  },
  amc: {
    type: Number,
    trim: true,
  },
  night: {
    type: Number,
    trim: true,
  },
  descreption: {
    type: String,
    trim: true,
  },
  package_img: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

PackageSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      }
    }
  );
});

PackageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Package", PackageSchema)
