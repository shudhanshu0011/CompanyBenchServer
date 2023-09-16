const mongoose = require("mongoose");

const companyListSchema = new mongoose.Schema({
  id: Number,
  name: String
}, { timestamps: true });

companyListSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['_id']
    delete ret['createdAt']
    delete ret['updatedAt']
    delete ret['__v']
    return ret
  }
})

const companyList = mongoose.model("companylist", companyListSchema);

module.exports = companyList;
