const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ZoneSchema = new Schema({
  zone_name: {
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

ZoneSchema.pre("update", function () {
  this.update(
    {},
    {
      $set: {
        updated_at: new Date(),
      },
    }
  );
});
ZoneSchema.plugin(mongoosePaginate)
module.exports = mongoose.model("Zone", ZoneSchema)