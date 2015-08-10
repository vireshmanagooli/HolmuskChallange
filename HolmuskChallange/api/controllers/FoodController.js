/**
 * FoodController
 *
 * @description :: Server-side logic for managing foods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {	
  	search:function(req,res){
  		var query = req.param('q');  	
  		console.log("Query : " + query);
  		
		Food.native(function (error, collection) {
      		if(error) 
      			res.json({error:err});

      		sails.highland(collection.find({
          		$text: { $search: query}}, 
          			   { fields: { _id: 1, name: 1, score: { '$meta': "textScore"}}
        		}).sort({score: { $meta: "textScore"}
        		}).limit(10)).map(function (item) {
          		delete item.score;
          		return item;
        	}).toArray(function (error, list) {
	          if(error) {
	            return res.json(error);
	          }

	          return res.json(list);
	        });
    	});
  	},

  	scrape:function(req,res){

		/*		
  		//Set the max dept as 4. 	
  		sails.simplecrawler.maxDepth = 4; 		
		sails.simplecrawler.crawl("http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts")		
		.on("fetchcomplete",function(queueItem){
			var processingUrl = queueItem.url;

			//check if the URL has http://www.myfitnesspal.com/food/calories/
			if(processingUrl.indexOf("http://www.myfitnesspal.com/food/calories/") > -1){
				console.log("processingUrl : " + processingUrl);	
				/*sails.request(processingUrl, function(error, response, html){
				    if(!error){
				        var $ = sails.cheerio.load(html);
				        console.log(html);

				         $('.food-description').filter(function(){
					        var data = $(this);
					        title = data.text();    
					        console.log(title);        					        
					    });					    
					}
				});


			}
			//Else skip the crawling			
		});*/
  	}
};