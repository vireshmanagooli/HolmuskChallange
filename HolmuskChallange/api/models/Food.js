/**
* Food.js
*
* @description :: This model holds the Food details along with Nutrition details.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'localMongodbServer',
  attributes: {
		name:{
		      	type:"string", 
		        required:true
		},	
		company:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
      	nutrition:{
            	model:'Nutrition'
        }	
  }
};

