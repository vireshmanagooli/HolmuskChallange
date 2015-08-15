/**
 * FoodController
 *
 * @description :: Server-side logic for managing foods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {	

	/**
	*	This is the search functionality. When query string is passed, then 
	*	It will look for approrpiate phrase in the database. 
	*   It will return the array of all objects with only name and  id fields.
	*/
  	search:function(req,res){
  		var query = req.param('q');  	
  		console.log("Query : " + query);
  		
  		Food.find({ name: {'contains': query}}, {fields: { _id: 1, name: 1}}).limit(10)
  		.exec(function(err, foods){
  			if(err) 
      			res.json({error:err});

  			console.log("Searched foods : " + foods);
  			return res.json(foods);
  		});		
  	},

  	/**
  	*	This is the scarpe & crawling functionality. The crwaling will be started at the following URL
  	*	http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts,
  	* 	checks any of the URL has the phrase http://www.myfitnesspal.com/food/calories/, then 
  	*   it will scrape that perticular URL and saves it to DB.
  	*/
  	scrape:function(req,res){

  		var xray = sails.xray();  		
  								
  		//Set the max dept as 4. 	
  		sails.simplecrawler.maxDepth = 4; 		
		sails.simplecrawler.crawl("http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts")		
		.on("fetchcomplete",function(queueItem){
			var processingUrl = queueItem.url;

			//check if the URL has http://www.myfitnesspal.com/food/calories/
			if(processingUrl.indexOf("http://www.myfitnesspal.com/food/calories/") > -1){
				console.log("processingUrl : " + processingUrl);	

				//Scrape the URL & get it in the object.
		  		xray(processingUrl, { title : '.food-description', nutritions  : ['#nutrition-facts > tbody > tr > td']})
		  		(function(err, obj) {
					
					console.log(obj);
					var name, company;
					//Split the title into company and name.
					if (obj.title.indexOf('-') > -1) {				
						var titles = obj.title.split('-');				
						company = titles[0];
						name = titles[1];
					}else{
						name = obj.title;
					}

					console.log("name, company : " + name + " "+ company);
					
					var scrapedNutrition = {
							calories: obj.nutritions[1], 
					      	sodium: obj.nutritions[3],
							totalFat: obj.nutritions[5],	
							potassium: obj.nutritions[7],
							saturated: obj.nutritions[9],		
							totalCarbs: obj.nutritions[11],
							polyunsaturated: obj.nutritions[13],	
							dietaryFiber: obj.nutritions[15],
							monounsaturated: obj.nutritions[17], 
							sugars: obj.nutritions[19],
							trans: obj.nutritions[21], 
							protein: obj.nutritions[23],	
							cholesterol: obj.nutritions[25],
							vitaminA: obj.nutritions[29],	
							calcium: obj.nutritions[31],	
							vitaminC: obj.nutritions[33],	
							iron: obj.nutritions[35]
					};
					
					//populate the nutrician contents.
					var scrapedFood = {
							name: name,	
							company: company,
					      	nutrition: scrapedNutrition,	
					};										

					//persist into database.
					Food.create(scrapedFood).exec(function (err) {
					  if (err) 
					  	res.json({error:err});
					
						console.log("Data saved") // Google  			  
					});

					
				});
			}
			//Else skip the crawling			
		});
		res.json({message: "Scraping started"});
  	}
};