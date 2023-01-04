const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const StateSchema = new Schema({
  state_name: {
    type: String,
    trim: true,
  },
  country_id: {
    type: ObjectId,
    ref: "Countrys"
  },
  zone_id: {
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
StateSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("State", StateSchema)