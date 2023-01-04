const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2")

const CitySchema = new Schema({
  city_name: {
    type: String,
    trim: true,
  },
  state_id: {
    type: ObjectId,
    ref: "State"
  },
  state_name: {
    type: String,
    trim: true,
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
CitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("City", CitySchema)