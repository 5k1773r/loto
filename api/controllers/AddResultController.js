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

var MIN_NUMBER = 1;
var MAX_NUMBER = 40;

module.exports = {
    
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
   create: function (req, res) {
    var paramDateOfResult = req.param('dateResult');
    var dateOfResult = new Date(paramDateOfResult);
    var arrResult = [req.param('firstBall'), req.param('secondBall'),
      req.param('thirdBall'), req.param('fourthBall'), req.param('fifthBall'), req.param('sixthBall')];

    if(((paramDateOfResult == null) && (arrResult.indexOf(null) != -1)) || (dateOfResult == "Invalid Date")) {
      return res.view('addresult/index', {
            source: 'single',
            boldMessage: 'You should check your inputs',
            messageSuccess: '',
            messageWarning: '',
            messageError: ' - The result has either alreadby been added or is incorrect !',
          });
    }
      
    // 7 donnees non vides
    var arrResultSorted = arrResult.slice(0);

    arrResultSorted.sort(function(first, second) {
      parseFirst = parseInt(first);
      parseSecond = parseInt(second);
      if(parseFirst < parseSecond)
        return -1;
      if(parseFirst > parseSecond)
        return 1;
      if(parseFirst == parseSecond)
        return 0;
    });

    var i = 0;
    (function checkDoublon(i) {
      console.log("ici 2 - " + i);
      var tmpBall = arrResultSorted[i];
      console.log("ici 2 - " + tmpBall);

      if((tmpBall < MIN_NUMBER || tmpBall > MAX_NUMBER) || (tmpBall == arrResultSorted[i + 1])) {
        return res.view('addresult/index', {
          source: 'single',
          boldMessage: 'You should check your inputs',
          messageSuccess: '',
          messageWarning: '',
          messageError: ' - The result has either alreadby been added or is incorrect !',
        });

        if(i < arrResultSorted.length - 1) {
          checkDoublon(i + 1);
          console.log("ici 3 - " + i);
        } 
        
      }
    })(i);


          console.log("ici 4 - " + i);

            //donnee valide
            // Verifier qu'il n'existe pas d'entree a la meme date au niveau de la BDD
            Result.find({name : "Tirage" + dateOfResult.toISOString()}).done(function(err, arrayResult) {
              if(err) {
                // Erreur technique au cours de la recherche
                return res.view('500');
              }
              if(arrayResult.length == 0) {
                var resultLine = new Object();
                resultLine['name'] = "Tirage" + dateOfResult.toISOString();
                resultLine['resultDate'] = dateOfResult;
                resultLine['type'] = "resultatLoto";
                resultLine['firstNumber'] = arrResult[0];
                resultLine['secondNumber'] = arrResult[1];
                resultLine['thirdNumber'] = arrResult[2];
                resultLine['fourthNumber'] = arrResult[3];
                resultLine['fifthNumber'] = arrResult[4];
                resultLine['sixthNumber'] = arrResult[5];

                // procéder à au processus d'insertion au niveau de la bdd
                Result.create(resultLine).done(function(err, result) {
                  if(!err) {
                    // la creation de la ligne s'est bien passée
                    console.log("Result successfully created " + result);

                    //MAJ des donnees de stat
                    /*
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
                                  console.log("Ball created !");
                                });
                              }
                              else {
                                var time = ballFound.time 
                                ballFound.time = time + 1;
                                ballFound.save(function(err) {
                                  console.log(err);
                                });  
                              }
                              
                            }
                          });

                        if(i < ball.length - 1) createBall(i + 1);
                      })(i);
                    });*/
                    // fin de MAJ des stats




                    // on retourne sur la page avec un message de succes
                    return res.view('addresult/index', {
                      source: 'single',
                      boldMessage: 'You\'re great',
                      messageSuccess: ' - The result has been successfully added !',
                      messageWarning: '',
                      messageError: '',
                    });

                  }
                  else {
                    // retourner erreur interne lors de la creation
                    return res.view('500');
                  }
                });
              }
              else {
                // erreur resultat deja existant
                console.log("Resultat ignore car deja present BDD");
                return res.view('addresult/index', {
                  source: 'single',
                  boldMessage: 'You should eat fish',
                  messageSuccess: '',
                  messageWarning: ' - The result has alreadby been added !',
                  messageError: ''
                });
              }
            });   
},


  /**
   * Action blueprints:
   *    `/manageresult/create`
   */
   importFile: function (req, res) {
    var fs = require('fs');
    var nameResult = new Array();
    var entete = true;
    var nbInserted = new Array();

    var arrayFile = fs.readFileSync(req.files.resultFile.path).toString().split('\n');
    arrayFile.shift(); // Suppression de la 1ère ligne entete

    Result.find({}).done(function(err, arrayResult) {
      if(err) {
        return res.view('500');
      }
      var i = 0;
      var arrayOfResultDate = new Array();
      (function controlData(i) {
        arrayOfResultDate.push(arrayResult[i].name);
        if(i < arrayResult.length - 1)
          controlData(i + 1);
      })(i);


      console.log(arrayOfResultDate);

      // A verifier
      i = 0;
      var outPut = null;
      (function checkNbField(i) {
        var arrResult = arrayFile[i].split(";");
        // Verfication du nombre de donnees sur une ligne
        if(arrResult.length != 7) {
          // gestion si moins ou plus de 7 données par ligne
          console.log("erreur nombre donnees par lignes");
           outPut = {
            source: 'import',
            boldMessage: 'Incorrect file !',
            messageSuccess: '',
            messageWarning: '',
            messageError: ' - The file is incorrect (line: ' + arrayFile[i] + ', Database cleanup needed A !',
          };
          return;
        }

        var dateOfResult = new Date(arrResult[0]);
        // controle de la date
        if((dateOfResult == "Invalid Date")){ //||(datePush.indexOf(arrResult[0]) != -1)) {
          outPut = {
              source: 'import',
              boldMessage: 'Incorrect file !',
              messageSuccess: '',
              messageWarning: '',
              messageError: ' - The file is incorrect (line: ' + arrayFile[i] + ', Database cleanup needed B !',
            };
          return;
        }
        //datePush.push(arrResult[0]);

        var resultToInsert = {
          name: "Tirage" + dateOfResult.toISOString(), 
          resultDate: dateOfResult,
          type: "resultatLoto",
          firstNumber: arrResult[1],
          secondNumber: arrResult[2],
          thirdNumber: arrResult[3],
          fourthNumber: arrResult[4],
          fifthNumber: arrResult[5],
          sixthNumber: arrResult[6]
        }

        arrResult.shift;
        // controle des valeurs transmises
        arrResult.sort(function(first, second) {
          parseFirst = parseInt(first);
          parseSecond = parseInt(second);
          if(parseFirst < parseSecond)
            return -1;
          if(parseFirst > parseSecond)
            return 1;
          if(parseFirst == parseSecond)
            return 0;
        });

        var j = 0;
        var checkOk = false;
        (function controlValue(j) {
          var tmpBall = arrResult[j];
          if((tmpBall < MIN_NUMBER || tmpBall > MAX_NUMBER) || (tmpBall == arrResult[j + 1])) {


            outPut = {
              source: 'import',
              boldMessage: 'Incorrect file !',
              messageSuccess: '',
              messageWarning: '',
              messageError: ' - The file is incorrect (line: ' + arrayFile[i] + ', Database cleanup needed Z !',
            
            };
            return;
          }
          if(j < arrResult.length - 1) {
            controlValue(j + 1);
          }
          else {
            checkOk = true;
          }
        })(j);


        if(checkOk) {

          console.log("Valeur de i " + i );
          console.log("Valeur de la chaine" + arrResult.toString() );

        // procéder à au processus d'insertion au niveau de la bdd
        if(arrayOfResultDate.indexOf(resultToInsert.name) == -1) {
          arrayOfResultDate.push(resultToInsert.name);
          Result.create(resultToInsert).done(function(err, result) {
            if(err) {
              // retourner erreur de creation
              return res.view('500');
            }
            // la creation de la ligne s'est bien passée
            console.log("Result successfully imported " + result);
            nbInserted.push(1);
          });
        }
        else {
          outPut =  {
          source: 'import',
          boldMessage: 'Incorrect file - duplicate entry !',
          messageSuccess: '',
          messageWarning: '',
          messageError: ' - The file is incorrect, Database cleanup needed Y !',
          }
          return;
        }
      }

        if(i < arrayFile.length - 1) {
          checkNbField(i + 1);
        }
      })(i);

      if(outPut == null) {
        outPut = {
          source: 'import',
          boldMessage: 'Well done !',
          messageSuccess: ' - The file has been processed !',
          messageWarning: '',
          messageError: '',
        }
      }
      else {
        // system de rollback ?
      }

      return res.view('addresult/index', outPut);
    });
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
