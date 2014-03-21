/**
 * ResultController
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

var ResultController = {

	index : function(req, res) {
		var resultCreateResult;
		Result.find().done(function(err, arrayResult) {
			if(err) {
				return;
			}
			console.log(arrayResult);
			return res.view({
                foo: arrayResult,
                machine : { id : 'tatata'}
            });
		});
	},


	create : function(req, res) {
		//var req.param();

		var TYPE = "resultatLoto";
		var MAX_NUMBER = 40;

		var dateInsert = new Date();	


		var firstNumber = 1;
		var secondNumber = 2;
		var thirdNumber = 3;
		var fourthNumber = 4;
		var fifthNumber = 5;
		var sixthNumber = 6;


		var insertion = new Object();
	    insertion['name'] = "Tirage" + dateInsert.toISOString();
	    insertion['resultDate'] = dateInsert;
	    insertion['type'] = TYPE;
	    
	    insertion['firstNumber'] = 11;
	    insertion['secondNumber'] = 12;
	    insertion['thirdNumber'] = 13;
	    insertion['fourthNumber'] = 14;
	    insertion['fifthNumber'] = 15;
	    insertion['sixthNumber'] = 16;

	    /*insertion['no' + firstNumber] = 1;
	    insertion['no' + secondNumber] = 1;
	    insertion['no' + thirdNumber] = 1;
	    insertion['no' + fourthNumber] = 1;
	    insertion['no' + fifthNumber] = 1;
	    insertion['no' + sixthNumber] = 1;

	    for(var i = 1; i <= MAX_NUMBER; i++) {
	      if(insertion['no' + i] == null) {
	        insertion['no' + i] = 0;
	      }
	    }
	    */


		Result.create(insertion).done(function(err, result) {
			if(!err) {
				console.log(result);
				 return res.view('result/index',
				 		{
		                	machine: "Create",
		                	foo: [result],

		            	});
			}
			else {
				return ;
			}
		});
	},

}

module.exports = ResultController;



/*
module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ResultController)
   *//*
  _config: {}

  
};
*/
