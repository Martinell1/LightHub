const mongoose = require('mongoose')

mongoose
  .connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB+Compass&ssl=false")
  .then(() => console.log("MongoDB Connect Succeed"))
  .catch((err) => console.log(err))

module.exports = mongoose;