const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const StateSchema = new Schema({
  state_name: {
    type: String,
    trim: true,
  },
  country_name: {
    type: ObjectId,
    ref: "Countrys"
  },
  zone_name: {
    type: ObjectId,
    ref: "Zones"
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

StateSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});

module.exports = mongoose.model("State", StateSchema)