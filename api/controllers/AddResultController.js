/**
 * ManageresultController
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

//var MIN_NUMBER = 1;
//var MAX_NUMBER = 40;

module.exports = {

    /**
     * Action blueprints:
     *    `/manageresult/create`
     */
    create: function (req, res) {
        var MIN_NUMBER = sails.config.configLoto.MIN_NUMBER;
        var MAX_NUMBER = sails.config.configLoto.MAX_NUMBER;


        var arrResult = [req.param('firstBall'), req.param('secondBall'),
            req.param('thirdBall'), req.param('fourthBall'), req.param('fifthBall'), req.param('sixthBall')];

        var ballKeyToInsert = [];
        var ballToInsert = {};
        // constitution du tableau d'objet ball a creer
        Ball.splitToBall(arrResult, ballToInsert, ballKeyToInsert);
        //Ball.createBall(ballKeyToInsert, ballToInsert);

        Result.insertResult({
                paramDateOfResult: req.param('dateResult'),
                dateOfResult: new Date(req.param('dateResult')),
                arrResult: arrResult
            },
            "addresult/index",
            {
                source: 'single',
                boldMessage:'You\'re great',
                messageSuccess: ' - The result has been successfully added !',
                messageWarning: '',
                messageError: ''
            },
            {
                source: 'single',
                boldMessage: 'You should check your inputs',
                messageError: '- The result has either already been added or is incorrect !',
                messageSuccess: '',
                messageWarning: '',
            },
            {
                source: 'single',
                boldMessage: 'You should eat fish',
                messageWarning: '- The result has either already been added or is incorrect !',
                messageSuccess: '',
                messageError: ''
            },
            "500",
            res, function() {
                Ball.createOrUpdateBall(ballKeyToInsert, ballToInsert);
            });
    },

    index: function(req, res) {
        return res.view({
            source: '',
            boldMessage: '',
            messageSuccess: '',
            messageWarning: '',
            messageError: ''
        });
    },

    /**
     * Action blueprints:
     *    `/manageresult/create`
     */
    importFile: function (req, res) {
        var MIN_NUMBER = sails.config.configLoto.MIN_NUMBER;
        var MAX_NUMBER = sails.config.configLoto.MAX_NUMBER;

        var util = require('util');
        var fs = require('fs');

        var entete = false; // todo a prendre en compte cote front par une checkbox

        var resultDateToImport = [];
        var ballKeyToInsert = [];
        var ballToInsert = {};

        var arrayFile = fs.readFileSync(req.files.resultFile.path).toString().split('\n');
        if(entete) arrayFile.shift(); // Suppression de la 1ère ligne entete
        if(arrayFile[arrayFile.length - 1].trim() == "") arrayFile.pop();


        //test VHK
        var i = 0;
        if(arrayFile.length > 0) {

            (function treatRecord(i) {
                var arrResult = arrayFile[i].split(";");
                var dateToCheck = new Date(arrResult.shift());
                if(typeof dateToCheck != 'undefined')
                    resultDateToImport.push({resultDate: dateToCheck});

                // constitution du tableau d'objet ball a creer
                Ball.splitToBall(arrResult, ballToInsert, ballKeyToInsert);


                if(i < arrayFile.length - 1) treatRecord(i + 1);
            })(i);

            // console.log(util.inspect(ballToInsert, false, null));

            // return res.json({hello: "world"});

            var i = 0;
            (function loadData(i) {
                var arrResult = arrayFile[i].split(";");
                var dateOfResult = arrResult[0];
                var firstNumber = arrResult[1];
                var secondNumber = arrResult[2];
                var thirdNumber = arrResult[3];
                var fourthNumber = arrResult[4];
                var fifthNumber = arrResult[5];
                var sixthNumber = arrResult[6];

                Result.insertResult({
                        paramDateOfResult: dateOfResult,
                        dateOfResult: new Date(dateOfResult),
                        arrResult: [firstNumber, secondNumber,
                            thirdNumber, fourthNumber, fifthNumber, sixthNumber]
                    },
                    "addresult/index",
                    {
                        source: 'import',
                        boldMessage:'You\'re great',
                        messageSuccess: ' - The result has been successfully added !',
                        messageWarning: '',
                        messageError: ''
                    },
                    {
                        source: 'import',
                        boldMessage: 'You should check your inputs ' + i,
                        messageError: '- The result has either already been added or is incorrect !',
                        messageSuccess: '',
                        messageWarning: '',
                    },
                    {
                        source: 'import',
                        boldMessage: 'You should eat fish',
                        messageWarning: '- The result has either already been added or is incorrect !',
                        messageSuccess: '',
                        messageError: ''
                    },
                    "500",
                    res, function() {
                        //Ball.createBall(ballKeyToInsert, ballToInsert);
                    });

                if(i < arrayFile.length - 1) loadData(i + 1);
                else {
                    if(resultDateToImport.length > 0) {
                        Result.count(resultDateToImport).done(function(err, count) {

                            // console.log("Comptage : " + count);

                            if(err) console.log(err);
                            if(!err) {
                                if(count == 0) {
                                    Ball.cleanBall(ballKeyToInsert, function() {
                                        Ball.createBall(ballKeyToInsert, ballToInsert);
                                    });
                                }
                            }
                        });
                    }
                }
            })(i);
        }
    },

    /**
     * Action blueprints:
     *    `/manageresult/update`
     */
    update: function (req, res) {

        // Send a JSON response
        return res.json({
            hello: 'world'
        });
    },


    /**
     * Action blueprints:
     *    `/manageresult/delete`
     */
    delete: function (req, res) {

        // Send a JSON response
        return res.json({
            hello: 'world'
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ManageresultController)
     */
    _config: {}

};
