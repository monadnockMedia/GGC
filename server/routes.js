/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/cards', require('./api/cards'));
  app.use('/api/things', require('./api/thing'));
  
};
