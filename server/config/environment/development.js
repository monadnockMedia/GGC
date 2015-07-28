'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/ggc-dev'
    uri: 'mongodb://aries.local/ggc-dev'
  },
  appConfig: require("../../../client/app/config.json"),
  seedDB: false
};
