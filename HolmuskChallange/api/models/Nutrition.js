/**
* Nutrition.js
*
* @description :: This Model holds the Nutrition details.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'localMongodbServer',
  attributes: {
  	calories:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	}, 
      	sodium:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
		totalFat:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},	
		potassium:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
		saturated:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},		
		totalCarbs:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
		polyunsaturated:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},	
		dietaryFiber:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
		monounsaturated:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	}, 
		sugars:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
		trans:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	}, 
		protein:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},	
		cholesterol:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},
		vitaminA:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},	
		calcium:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},	
		vitaminC:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	},	
		iron:{
	    	    type:"string",
	        	required:false,
	        	unique: false
      	}
  }
};

