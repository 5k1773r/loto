var MIN_NUMBER = 1;
var MAX_NUMBER = 40;

// Ball.js
var Ball = {

  attributes: {
    key: {
      type: 'STRING',
      primaryKey: true
    },
    min: {
      type: 'INTEGER',
      min: MIN_NUMBER,
      max: MAX_NUMBER,
      required: true
    },
    med: {
      type: 'INTEGER',
      min: MIN_NUMBER,
      max: MAX_NUMBER,
      required: true
    },
    max: {
      type: 'INTEGER',
      min: MIN_NUMBER,
      max: MAX_NUMBER,
      required: true
    },
    time: {
      type: 'INTEGER',
      min: 1,
      required: true
    }
  },

   splitToBall: function(arrData, result, arrKey) {
        //var arrNumber = new Array(one, two, three, four, five, six);
        var arrNumber = arrData;
        console.log(arrNumber.toString());
        //result = new Array();

        arrNumber.sort(function(first, second) {
            parseFirst = parseInt(first);
            parseSecond = parseInt(second);
            if(parseFirst < parseSecond)
                return -1;
            if(parseFirst > parseSecond)
                return 1;
            if(parseFirst == parseSecond)
                return 0;
        });

        for(var i = 0; i < arrNumber.length; i++) {
            for(var j = i; j < arrNumber.length; j++) {
                if(j == i) continue;
                for(var k = j; k < arrNumber.length; k++) {
                    if(k == i || k == j) continue;
                    //console.log('insertion dans le tableau de ' + arrNumber[i] + '-' + arrNumber[j] + '-' + arrNumber[k]);
                    var key = arrNumber[i] + '-' + arrNumber[j] + '-' + arrNumber[k];
                    if(typeof result[key] == 'undefined') {
                        result[key] = {
                            key: key,
                            min: arrNumber[i],
                            med: arrNumber[j],
                            max: arrNumber[k],
                            time: 1
                        };
                        arrKey.push(key);
                    }
                    else {
                        result[key].time = result[key].time + 1;
                    }
                }
            }
        }
    },

    createBall: function(arrKey, arrObject) {
        var util = require('util');
        //console.log("Inside createBall");

        var i = 0;
        var objectBall = this;
        (function createBallFromArray(i) {
            objectBall.create(arrObject[arrKey[i]]).done(function(err, inserted) {
                if(err) console.log(err);
                //if(!err) console.log("Inserted : " + inserted.key);
            });

            if(i < arrKey.length - 1) createBallFromArray(i + 1);
        })(i);
   },

    createOrUpdateBall: function(arrKey, arrObject) {
        var util = require('util');
        //console.log("Inside createOrUpdateBall");

        var i = 0;
        var objectBall = this;
        (function createBallFromArray(i) {

            objectBall.findOne({key: arrKey[i]}).done(function(err, ball) {
                if(err) console.log(err);
                if(typeof ball == 'undefined') {
                    objectBall.create(arrObject[arrKey[i]]).done(function(err, inserted) {
                        if(err) console.log(err);
                        if(!err) console.log("Inserted : " + inserted.key);
                    });
                }
                else {
                    ball.time++;
                    ball.save(function(err) {
                        console.log(err);
                    });
                }
            });

            if(i < arrKey.length - 1) createBallFromArray(i + 1);
        })(i);
    },

   afterCreate: function(result, next) {
       console.log("inside aftercreate ball");
       next();
   },

    cleanBall: function (arrKey, func) {
        var i = 0;
        var arrToDelete = [];
        if(arrKey.length > 0) {
            (function createKeyToDestroy(i) {
                arrToDelete.push({key: arrKey[i]});

                if(i < arrKey.length - 1) createKeyToDestroy(i + 1);
            })(i);

            this.destroy(arrToDelete).done(function(err) {
                if(err) console.log(err);
                if(!err) func();
            });
        }
        else
            func();
    }

};

module.exports = Ball;