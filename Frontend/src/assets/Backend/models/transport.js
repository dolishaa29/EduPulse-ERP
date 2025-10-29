let mongo = require("mongoose");

let transport = mongo.Schema({
  conditionName: { type: String},
  status: { type: String },
  routeName: { type: String},
  routeDetails: { type: String },
  driverName: { type: String},
  driverContact: { type: String},
  licenseNumber: { type: String},   
  busType: { type: String }, 
  busCapacity: { type: Number}, 
  busNumber: { type: String}, 
});

module.exports = mongo.model('transport', transport);
