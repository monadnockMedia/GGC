'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/ggc-dev'
      uri:  process.env.MONGOD_URI ||
          'mongodb://localhost/ggc-dev'
  },
  appConfig: require("../../../client/app/config.json"),
  seedDB: false
};
