/**
 * DashboardController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/dashboard/index`
   *    `/dashboard`
   */
   index: function (req, res) {
      var MIN_NUMBER = sails.config.configLoto.MIN_NUMBER;
      var MAX_NUMBER = sails.config.configLoto.MAX_NUMBER;

      var stringColumns = [];
      var i = MIN_NUMBER;
      (function generateColumn(i) {
          stringColumns.push("no" + i);
          if(i < MAX_NUMBER) generateColumn(i + 1);
      }) (i);

      //console.log(stringColumns.toString());

      //Result.find().sum(["no1", "no2"]).done(function(err, result) {
      Result.find().sum(stringColumns).done(function(err, result) {
          if(err) return res.view("500");


          var util = require("util");
          //console.log(util.inspect(result, false, null));

          var arrResult;
          if(result.length > 0) {
              arrResult = result[0]; // sum => un seul enregistrement
          }
          else {
              arrResult = [];
          }

          return res.view("dashboard/index", {
            xaxis: stringColumns,
            data: arrResult
          });
      });

    // Send a JSON response
    /* return res.json({
      hello: 'world'
    }); */


  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DashboardController)
   */
  _config: {}

  
};
