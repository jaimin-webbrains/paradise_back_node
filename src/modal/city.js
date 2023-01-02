const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const CitySchema = new Schema({
  city_name: {
    type: String,
    trim: true,
  },
  state_name: {
    type: ObjectId,
    ref: "States"
  },
  descreption: {
    type: String,
    trim: true
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

CitySchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model("City", CitySchema)