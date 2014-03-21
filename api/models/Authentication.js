/**
 * Authentication
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	login : {
  		type: 'STRING',
  		required: 'TRUE'
  	},
  	password : {
  		type: 'STRING',
  		required: 'TRUE'
  	},
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
