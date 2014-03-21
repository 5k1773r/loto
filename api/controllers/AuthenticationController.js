/**
 * AuthenticationController
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

  	console.log("Passe ici");
    // redirige vers le tableau des résultat si déjà authentifié
    if(req.session.authenticated) {
      return res.redirect('/Result'); 
    }

  	return res.view("authentication/index", {
				login: "",
				message: ""
			});
  },

   logout: function(req, res) {

    console.log("Sortie ici");
    // redirige vers le tableau des résultat si déjà authentifié
    req.session.authenticated = false;
    req.session.login = null;
    return res.view("authentication/index", 
        {
        login: "",
        message: ""
      });
  },


  verify: function(req, res) {
  	var reqLogin = req.param("login");
  	var reqPassword = req.param("password");

  	Authentication.find().where(
  		{
  			login: reqLogin, 
  			password: reqPassword
  		}).done(
  			function(err, authentication) {
  				console.log("ici " + authentication);
	  			if(err || (authentication.length == 0)) {
	  				return res.view('authentication/index', 
	  						{
	  							login: reqLogin,
	  							message: "User or Password invalid !"
	  						});	
	  			}
	  			req.session.authenticated = true;
          req.session.login = reqLogin;
	  			return res.redirect('/Result');		
  			});

  	

  	/*return res.view({
  		name: "result/index",
                foo: [{name: 'Foo Fighters'}, {name: 'Dave Grohl'}]
            });*/

  }


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthenticationController)
   */
  //_config: {}

  
};
