const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2")

const CountrySchema = new Schema({
  country_name: {
    type: String,
    trim: true,
  },
  is_national: {
    type: Boolean,
    default: false,
  },
  descreption: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
})

CountrySchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

CountrySchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Country", CountrySchema)