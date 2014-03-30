/**
 * FooController
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

var FooController = {

	index : function(req, res) {
var util = require("util");
		var foo = req.param('foo');
		res.end(util.inspect(req));


        Result.find().sum(["no1", "no2"]).done(function(err, result) {
          if(err) console.log(err);

          console.log(util.inspect(result, false, null));
        });



		 return res.view({
                foo: [{name: 'Foo Fighters'}, {name: 'Dave Grohl'}]
            });

	},

}

module.exports = FooController;

/* module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to FooController)
   */
 /* _config: {}



  
};*/
