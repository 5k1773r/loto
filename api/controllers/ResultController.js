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

module.exports = {

	index : function(req, res) {
        var page = 1;
        var maxPage = 1;

        if(typeof req.param('page') != "undefined") page = req.param('page');
        if(typeof req.param('maxPage') != "undefined") maxPage = req.param('maxPage');


        if(req.param('action') != "undefined") {
            if(req.param('action') == "previous") {
                    if(parseInt(page) > 1)
                        page = parseInt(page) - 1;
            }
            if(req.param('action') == "next") {
                if(parseInt(page) < parseInt(maxPage))
                    page = parseInt(page) + 1;
            }
        }

        Result.count().done(function(err, numberResult) {
            if(err) return err;

            console.log("numberResult ---> " + numberResult);


            Result.find().sort({ resultDate: 'desc' }).paginate({page: page, limit: 10}).done(function(err, arrayResult) {
                if(err) return err;

                //var util = require("util");
                //console.log(util.inspect(arrayResult, false, null));

                if(req.isAjax) {
                    return res.json({
                        resultData: arrayResult,
                        params : {
                            showAll: false,
                            page: page,
                            maxPage: Math.ceil(numberResult / 10)

                        }
                    });
                }
                else {
                    //console.log(arrayResult);
                    return res.view({
                        resultData: arrayResult,
                        params : {
                            showAll: false,
                            page: page,
                            maxPage: Math.ceil(numberResult / 10)
                        }
                    });
                }
            });
        });
	},


	showAll : function(req, res) {
        Result.find().sort({ resultDate: 'desc' }).done(function(err, arrayResult) {
            if(err) {
                return;
            }
            //console.log(arrayResult);
            return res.view("result/index", {
                resultData: arrayResult,
                params: {
                    showAll: true,
                    page: 0
                }
            });
        });
	},


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ResultController)
     */
     _config: {}

};
