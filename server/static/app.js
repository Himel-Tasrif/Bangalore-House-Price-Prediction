function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

function getBalcony() {
    var uiBalcony = document.getElementsByName("uiBalcony");
    for(var i in uiBalcony) {
      if(uiBalcony[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
 }


  
  function getBHKValue() {
    var uiBedrooms = document.getElementsByName("uiBedrooms");
    for(var i in uiBedrooms) {
      if(uiBedrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bedroom = getBHKValue();
    var bathrooms = getBathValue();
    var balcony = getBalcony();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    // var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bedroom: bedroom,
        bath: bathrooms,
        balcony: balcony,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h4>₹ " + data.estimated_price.toString() + " rupee</h4>";

        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );

    var url = "/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;