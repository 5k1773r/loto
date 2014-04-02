var MIN_NUMBER = 1;
var MAX_NUMBER = 40;

// Result.js
var Result = {

    attributes: {
        name : {
            type : 'STRING',
            required: true
        },
        resultDate : {
            type : 'DATE',
            required: true
        },
        type : {
            type : 'STRING',
            defaultsTo: 'lotoResult'
        },
        firstNumber : {
            type : 'INTEGER',
            min: MIN_NUMBER,
            max: MAX_NUMBER
        },
        secondNumber : {
            type : 'INTEGER',
            min: MIN_NUMBER,
            max: MAX_NUMBER
        },
        thirdNumber : {
            type : 'INTEGER',
            min: MIN_NUMBER,
            max: MAX_NUMBER
        },
        fourthNumber : {
            type : 'INTEGER',
            min: MIN_NUMBER,
            max: MAX_NUMBER
        },
        fifthNumber : {
            type : 'INTEGER',
            min: MIN_NUMBER,
            max: MAX_NUMBER
        },
        sixthNumber : {
            type : 'INTEGER',
            min: MIN_NUMBER,
            max: MAX_NUMBER
        },

        no1 : {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no2 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no3 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no4 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no5 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no6 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no7 :  {
            type : 'INTEGER',
            defaultsTo: 0,
            required: true
        },
        no8 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no9 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no10 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no11 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no12 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no13 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no14 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no15 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no16 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no17 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no18 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no19 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no20 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no21 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no22 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no23 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no24 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no25 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no26 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no27 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no28 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no29 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no30 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no31 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no32 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no33 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no34 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no35 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no36 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no37 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no38 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no39 :  {
            type : 'INTEGER',
            defaultsTo: 0
        },
        no40 : {
            type : 'INTEGER',
            defaultsTo: 0
        }
    },

    controlData : function(resultDate, arrResult) {
        var conf = sails.config;
        var MIN_NUMBER = conf.configLoto.MIN_NUMBER;
        var MAX_NUMBER = conf.configLoto.MAX_NUMBER;

        var testDate = new Date(resultDate);
        //var arrResult = new Array(firstBall, secondBall, thirdBall, fourthBall, fifthBall, sixthBall);

        arrResult.sort(function(first, second) {
            if(first < second)
                return -1;
            if(first > second)
                return 1;
            return 0;
        });

        var objectError = {
            code : 0,
            message : "Error on line : " + resultDate + ";" + arrResult.join(";").toString()
        };
        var objectSuccess = {
            code : 1,
            message : "Control result is OK"
        };

        for(var i = 0; i < arrResult.length; i++) {
            var tmpBall = arrResult[i];
            if(tmpBall < MIN_NUMBER || tmpBall > MAX_NUMBER) {
                objectError.message +=  " - Result out of range";
                return objectError;
            }

            if(tmpBall == arrResult[i+1]) {
                objectError.message +=  " - Duplicate result";
                return objectError;
            }
        }

        if(testDate == "Invalid Date") {
            objectError.message +=  " - Invalid Date";
            return objectError;
        }

        return objectSuccess;
    },

    beforeCreate : function(values, next) {

        var conf = sails.config;
        //var MIN_NUMBER = conf.configLoto.MIN_NUMBER;
        var MAX_NUMBER = conf.configLoto.MAX_NUMBER;

        //console.log("Inside Model Result : beforeCreate");

        values['no' + values.firstNumber] = 1;
        values['no' + values.secondNumber] = 1;
        values['no' + values.thirdNumber] = 1;
        values['no' + values.fourthNumber] = 1;
        values['no' + values.fifthNumber] = 1;
        values['no' + values.sixthNumber] = 1;

        for(var i = 1; i <= MAX_NUMBER; i++) {
            if(values['no' + i] == null) {
                values['no' + i] = 0;
            }
        }

        next();
    },

    afterCreate : function(result, next) {
        /*console.log("Inside Model Result : afterCreate");

// var util = require('util');
// console.log(util.inspect(result, false, null));

        var arrResult = [result.firstNumber, result.secondNumber, result.thirdNumber,
            result.fourthNumber, result.fifthNumber, result.sixthNumber];

        var ball = [];
        Ball.split(arrResult, ball, function() {
            console.log('finished ' + ball.length);
            var i = 0;
            (function createBall(i) {
                Ball.findOne({
                    key: ball[i].min + '-' + ball[i].med + '-' + ball[i].max
                }).done(function(err, ballFound) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log("======> " + typeof ballFound);
                            if(typeof ballFound == 'undefined') {
                                Ball.create(ball[i]).done(function(err, inserted) {
                                    if(err) console.log(err);
                                    //console.log("Ball " + inserted.key + "created !");
                                });
                           }
                            else {
                                ballFound.time++;
                                ballFound.save(function(err) {
                                    console.log(err);
                                });
                            }
                        }
                    });

                if(i < ball.length - 1) createBall(i + 1);
            })(i);
        });
*/
        next();
    },

    insertResult : function(reqData, viewSuccess, objSuccess, objError, objAlready, viewError, res, func) {

        if(((reqData.paramDateOfResult == null) && (reqData.arrResult.indexOf(null) != -1))
            || (reqData.dateOfResult == "Invalid Date")) {
            console.log("Invalid Date");
            return res.view(viewSuccess, objError);
            /*return {
             view: viewSuccess,
             returnParameters: objError
             };*/
        }
        else {
            // 7 donnees non vides
            var arrResultSorted = reqData.arrResult.slice(0);

            arrResultSorted.sort(function(first, second) {
                var parseFirst = parseInt(first);
                var parseSecond = parseInt(second);

                var result = null;
                if(parseFirst < parseSecond)
                    result = -1;
                if(parseFirst > parseSecond)
                    result = 1;
                if(parseFirst == parseSecond)
                    result = 0;
                return result;
            });

            var i = 0;
            (function hasDoublon(i) {
                //console.log("Dans checkDoublon : " + i);
                var tmpBall = arrResultSorted[i];

                if(!(tmpBall >= MIN_NUMBER && tmpBall <= MAX_NUMBER && tmpBall != arrResultSorted[i + 1])) {
                    console.log("Invalid Number");
                    return res.view(viewSuccess, objError);
                    /*return {
                     view: viewSuccess,
                     returnParameters: objError
                     };*/
                }
                else
                if(i < arrResultSorted.length - 1) hasDoublon(i + 1);
            })(i);

            //donnee valide
            // Verifier qu'il n'existe pas d'entree a la meme date au niveau de la BDD
            //Result.find({
            var objectResult = this;
            objectResult.find({
                name : "Tirage" + reqData.dateOfResult.toISOString()
            }).done(function(err, arrayResult) {
                    //console.log("ICI dans find");
                    if(err) {
                        return res.view(viewError, {});
                        /*return {
                         view: viewError,
                         returnParameters: {}
                         };*/
                    }
                    if(arrayResult.length != 0) {
                        //console.log("Resultat ignore car deja present BDD");
                        return res.view(viewSuccess, objAlready);
                    }

                    var resultLine = {
                        name: "Tirage" + reqData.dateOfResult.toISOString(),
                        resultDate: reqData.dateOfResult,
                        type: "resultatLoto",
                        firstNumber: reqData.arrResult[0],
                        secondNumber: reqData.arrResult[1],
                        thirdNumber: reqData.arrResult[2],
                        fourthNumber: reqData.arrResult[3],
                        fifthNumber: reqData.arrResult[4],
                        sixthNumber: reqData.arrResult[5]
                    };

                    // procéder à au processus d'insertion au niveau de la bdd
                    objectResult.create(resultLine).done(function(err, result) {
                        if(!err) {
                            // la creation de la ligne s'est bien passée
                            //console.log("Result successfully created " + result);
                            func();

                            return res.view(viewSuccess, objSuccess);
                            /*return {
                             view: viewSuccess,
                             returnParameters: objSuccess
                             };*/
                        }
                        else {
                            return res.view(viewError, {});
                            /*
                             return {
                             view: viewError,
                             returnParameters: {}
                             };*/
                        }
                    });
                });
        }

    }
};

module.exports = Result;