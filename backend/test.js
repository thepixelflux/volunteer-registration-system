const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://prishamaurya_db_user:wMJv2Gohg6JCK7Cp@ac-7kvrlhg-shard-00-00.fmdle3v.mongodb.net:27017,ac-7kvrlhg-shard-00-01.fmdle3v.mongodb.net:27017,ac-7kvrlhg-shard-00-02.fmdle3v.mongodb.net:27017/volunteerDB?ssl=true&replicaSet=atlas-fmdle3v-shard-0&authSource=admin&retryWrites=true&w=majority'
)
.then(() => {
  console.log('CONNECTED');
})
.catch(err => {
  console.error(err);
});