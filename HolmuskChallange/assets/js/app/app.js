$( document ).ready(function() {
    
  var map = {};

  /**
  *   This method populates the search results on the srean with detailed Nutrition factors.
  */
  var pupulateData = function(food){
    $("#details").empty();    
    $("#details").append("<hr><h3>"+food.company+" - " + food.name+"<h3><hr>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>Calories:</label>"+food.nutrition.calories+"</div>"+
                                          "<div class='col-md-2'><label>Sodium:</label>"+food.nutrition.sodium+"</div>"+
                                          "<div class='col-md-2'><label>totalFat:</label>"+food.nutrition.totalFat+"</div>"+
                                          "<div class='col-md-2'><label>potassium:</label>"+food.nutrition.potassium+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>saturated:</label>"+food.nutrition.saturated+"</div>"+
                                          "<div class='col-md-2'><label>totalCarbs:</label>"+food.nutrition.totalCarbs+"</div>"+
                                          "<div class='col-md-2'><label>saturated:</label>"+food.nutrition.saturated+"</div>"+
                                          "<div class='col-md-2'><label>totalCarbs:</label>"+food.nutrition.totalCarbs+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>polyunsaturated:</label>"+food.nutrition.polyunsaturated+"</div>"+
                                          "<div class='col-md-2'><label>dietaryFiber:</label>"+food.nutrition.dietaryFiber+"</div>"+
                                          "<div class='col-md-2'><label>monounsaturated:</label>"+food.nutrition.monounsaturated+"</div>"+
                                          "<div class='col-md-2'><label>sugars:</label>"+food.nutrition.sugars+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>trans:</label>"+food.nutrition.trans+"</div>"+
                                          "<div class='col-md-2'><label>protein:</label>"+food.nutrition.protein+"</div>"+
                                          "<div class='col-md-2'><label>cholesterol:</label>"+food.nutrition.cholesterol+"</div><div>");

    $("#details").append("<div class='row'>&nbsp;<hr><div>");
    $("#details").append("<div class='row'><div class='col-md-2'><label>vitaminA:</label>"+food.nutrition.vitaminA+"</div>"+
                                          "<div class='col-md-2'><label>calcium:</label>"+food.nutrition.calcium+"</div>"+
                                          "<div class='col-md-2'><label>vitaminC:</label>"+food.nutrition.vitaminC+"</div>"+
                                          "<div class='col-md-2'><label>protein:</label>"+food.nutrition.iron+"</div></div>");

    $('#details').fadeIn();
  };

  /**
  *   Initializing the typeahead module to get the suggestions on the screen.
  *   Minimun 1 characters has to be typed to get the result set.
  */
  $('#foodSearch .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'foods',
    source: function (query, process) {
              foods = [];                          
              $.ajax({
                url: "http://localhost:1337/food/search?q="+query,                
                method: "GET",
                async : false,
                success: function(data){                                             
                  $.each(data, function (i, food) {
                      map[food.name] = food;
                      foods.push(food.name);
                  });   
                  console.log("foods : " + foods);
                  process(foods);                          
                }
              });              
    }
  });

  /**
  *   On select of perticular item from the typeahead drop down,    
  *   get the item id and get the detailed description from the DB.
  */
  $('.typeahead').on('typeahead:selected', function(event, datum) {
    console.log("Selected Object : " + map[datum]);
    var food = map[datum];
    $.ajax({
                url: "http://localhost:1337/food?id="+food.id,                
                method: "GET",                
                success: function(data){                                                              
                  pupulateData(data);                          
                }
      }); 
  });

  /**
  *   TO start the scraping 
  */
  $("#scrape").click(function(e){
    
    $.ajax({
      url: "http://localhost:1337/food/scrape",      
      method: "GET",
      success: function(result){            
            $('#scrapeSuccess').fadeIn();
            $('#scrapeSuccess').delay(3000).fadeOut();            
      }
    });

  });

  /**
  *   TO manually add the food item with Nutrition factor.
  */
  $("#addManualForm").submit(function(e) {
    e.preventDefault();
    var formDataArray = $(this).serializeArray(); 

    //Name is mandatory
    if(!formDataArray[0].value){
      alert("Name is mandatory");
      return;
    }

    var nutrition = {
              calories: formDataArray[2].value, 
              sodium: formDataArray[3].value,
              totalFat: formDataArray[4].value,  
              potassium: formDataArray[5].value,
              saturated: formDataArray[6].value,   
              totalCarbs: formDataArray[7].value,
              polyunsaturated: formDataArray[8].value,  
              dietaryFiber: formDataArray[9].value,
              monounsaturated: formDataArray[10].value, 
              sugars: formDataArray[11].value,
              trans: formDataArray[12].value, 
              protein: formDataArray[13].value,  
              cholesterol: formDataArray[14].value,
              vitaminA: formDataArray[15].value, 
              calcium: formDataArray[16].value,  
              vitaminC: formDataArray[17].value, 
              iron: formDataArray[18].value
          };
          
          //populate the nutrician contents.
    var food = {
             name: formDataArray[0].value, 
             company: formDataArray[1].value,
             nutrition: nutrition,  
    };

    $.ajax({
      url: "http://localhost:1337/food/create",
      data: food,
      method: "GET",
      success: function(result){            
            $('#dataSaveSuccess').fadeIn();
            $('#dataSaveSuccess').delay(3000).fadeOut();
            $("#reset").click();
      }
    });
  });

});