'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/ggc-dev'
    uri: 'mongodb://127.0.0.1/ggc-dev'
  },
  appConfig: require("../../../client/app/config.json"),
  seedDB: false
};
