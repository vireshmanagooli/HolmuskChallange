$( document ).ready(function() {
    
  var map = {};

  var pupulateData = function(food){
    $("#details").empty();    
    $("#details").append("<hr><h3>"+food.company+" " + food.name+"<h3><hr>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>Calories:</label>"+food.calories+"</div>"+
                                          "<div class='col-md-2'><label>Sodium:</label>"+food.sodium+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>totalFat:</label>"+food.totalFat+"</div>"+
                                          "<div class='col-md-2'><label>potassium:</label>"+food.potassium+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>saturated:</label>"+food.saturated+"</div>"+
                                          "<div class='col-md-2'><label>totalCarbs:</label>"+food.totalCarbs+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>saturated:</label>"+food.saturated+"</div>"+
                                          "<div class='col-md-2'><label>totalCarbs:</label>"+food.totalCarbs+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>polyunsaturated:</label>"+food.polyunsaturated+"</div>"+
                                          "<div class='col-md-2'><label>dietaryFiber:</label>"+food.dietaryFiber+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>monounsaturated:</label>"+food.monounsaturated+"</div>"+
                                          "<div class='col-md-2'><label>sugars:</label>"+food.sugars+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>trans:</label>"+food.trans+"</div>"+
                                          "<div class='col-md-2'><label>protein:</label>"+food.protein+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>cholesterol:</label>"+food.cholesterol+"</div><div><hr>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>vitaminA:</label>"+food.vitaminA+"</div>"+
                                          "<div class='col-md-2'><label>calcium:</label>"+food.calcium+"</div></div>");

    $("#details").append("<div class='row'><div class='col-md-2'><label>vitaminC:</label>"+food.vitaminC+"</div>"+
                                          "<div class='col-md-2'><label>protein:</label>"+food.iron+"</div></div>");

    $('#details').delay(2000).fadeIn();
  };

  $('#foodSearch .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 3
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

  $('.typeahead').on('typeahead:selected', function(event, datum) {
    console.log("Selected Object : " + map[datum]);
    var food = map[datum];
    $.ajax({
                url: "http://localhost:1337/food?id="+food._id,                
                method: "GET",                
                success: function(data){                                                              
                  pupulateData(data);                          
                }
      }); 
  });

  $("#addManualForm").submit(function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: "http://localhost:1337/food/create",
      data: formData,
      method: "GET",
      success: function(result){            
            $('#dataSaveSuccess').fadeIn();
            $('#dataSaveSuccess').delay(2000).fadeOut();
            $("#reset").click();
      }
    });
  });

});