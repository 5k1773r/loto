/**
 * BuildResultController
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

    index: function(req, res) {
        return res.view("buildresult/index", {
            login: "",
            message: ""
        });
    },

    getSuggestions: function(req, res) {

        var util = require('util');
        //console.log(util.inspect(req.param, false, null));

        if(!req.isAjax) return res.view("403", {});

        var sentNumber = req.param('number');
        var sentName = req.param('name');

        var searchNumber =  [
            {
                min: parseInt(sentNumber)
            },
            {
                med: parseInt(sentNumber)
            },
            {
                max: parseInt(sentNumber)
            }
        ];

        Ball.find().where({or: searchNumber}).sort({ time: 'desc' }).done(

            function(err, founds) {
                if(err) console.log(err);

                if(founds.length == 0)
                    return res.json({
                        number: sentNumber,
                        name: sentName,
                        amigos: [],
                        stats: [],
                        message: 'No data found'
                    });

                var i = 0;
                var j = 0;
                var stats = [];

                (function getStats(i) {

                    var searchSearchStat = {};
                    searchSearchStat["no" + founds[i].min] = 1;
                    searchSearchStat["no" + founds[i].med] = 1;
                    searchSearchStat["no" + founds[i].max] = 1;

                    Result.find(searchSearchStat).done(function(err, results) {
                        var k = 0;
                        var arrDate = [];
                        (function getOnlyDatesAndResult(k) {
                            arrDate.push({
                                resultDate: results[k].resultDate,
                                result : results[k].firstNumber + "-" + results[k].secondNumber + "-" + results[k].thirdNumber + "-" +
                                    results[k].fourthNumber + "-" + results[k].fifthNumber + "-" + results[k].sixthNumber
                            });
                            if(k < results.length - 1) getOnlyDatesAndResult(k + 1);
                        })(k);
                        stats[i] = arrDate;
                        j = j + 1;

                        if(j == founds.length - 1) {
                            console.log("Tableau date stats : ");
                            console.log(util.inspect(stats, false, null));

                            console.log("Tableau trio : ");
                            console.log(util.inspect(founds, false, null));

                            return res.json({
                                number: sentNumber,
                                name: sentName,
                                amigos: founds,
                                stats: stats,
                                message: 'OK'
                            });
                        }
                    });

                    if(i < founds.length - 1) getStats(i + 1);

                })(i);

            });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to BuildResultController)
     */
    _config: {}


};
