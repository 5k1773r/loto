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

    console.log("Inside Model Result : beforeCreate");

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
    console.log("Inside Model Result : afterCreate");

// var util = require('util');
// console.log(util.inspect(result, false, null));

    var arrResult = new Array(result.firstNumber, result.secondNumber, result.thirdNumber, result.fourthNumber, result.fifthNumber, result.sixthNumber);

    var ball = new Array();
    Ball.split(arrResult, ball, function() {
      console.log('finished ' + ball.length)
      var i = 0;
      (function createBall(i){
          Ball.findOne({
            key: ball[i].min + '-' + ball[i].med + '-' + ball[i].max
          }).done(function(err, ballFound) {
            if(err) {
              console.log(err);
            }
            else {
              if(typeof ballFound == 'undefined') {
                Ball.create(ball[i]).done(function(err, inserted) {
                  if(err) console.log(err);
                  console.log("Ball " + inserted.key + "created !");
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

    next();
  },

};

module.exports = Result;