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
    },
  },

  split: function(arrData, result, callBack) {
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
            console.log('insertion dans le tableau de ' + arrNumber[i] + '-' + arrNumber[j] + '-' + arrNumber[k]);
            result.push({
              key: arrNumber[i] + '-' + arrNumber[j] + '-' + arrNumber[k],
              min: arrNumber[i],
              med: arrNumber[j],
              max: arrNumber[k],
              time: 1
            });
        }
      }
    }
    console.log(result.length + ' ' + result);
    callBack();

  },


   beforeCreate : function(values, next) {

    console.log("Inside Model Ball : beforeCreate");

    next();
  }


};

module.exports = Ball;