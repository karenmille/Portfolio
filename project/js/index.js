//Time
var Clock = function(elem){
		  var timeNode = elem;
  var timeNodeTime = timeNode.querySelector('.js_time');
  var timeNodeDate = timeNode.querySelector('.js_date');
		  var lastMinute;
		  this.update = function(){
		    requestAnimationFrame(this.update);
		    var date = new Date;
		    if(date.getMinutes() != lastMinute){
		      timeNode.setAttribute('datetime', date.toISOString());
  		    timeNodeTime.textContent = date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();
      timeNodeDate.textContent = date.toLocaleDateString();
		      lastMinute = date.getMinutes();
		    } else{
		      lastMinute = date.getMinutes();
		    }
		  }.bind(this);
		};

		var mainClock = new Clock(document.querySelector('.js_time'));
		mainClock.update();

//AJAX
var ajax = function(method,url,callback){
		  var response;
		  var r = new XMLHttpRequest(); 
		  r.open(method.toUpperCase(), url, true);
		  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
		  	  callback(r.responseText)
		  };
		  r.send();
		};



//Weather
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(position) {
    var geoLocation = new CustomEvent('geoLocation', { 'detail' : {'latitude' : position.coords.latitude, 'longitude': position.coords.longitude }});
    window.dispatchEvent(geoLocation);
  },function() {
    var geoLocation = new CustomEvent('geoLocation', { 'detail' : false });
    window.dispatchEvent(geoLocation);
  });
}

var Meteo = function(elem){
  var meteoNode = elem;
  var temperatureNode = meteoNode.querySelector('.js_temperature');
  var conditionNode = meteoNode.querySelector('.js_weather-condition');
  var nameNode = meteoNode.querySelector('.js_weather-city');
  this.initialize = function(latitude, longitude){
    		ajax('get', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + ',de&units=metric', function(response){
      response = JSON.parse(response);
      conditionNode.classList.add('icon-' + response.weather[0].icon);
      temperatureNode.textContent = Math.round(response.main.temp) + '°C';
      nameNode.textContent = response.name;
          
      meteoNode.classList.add('loaded');
    });
  }.bind(this);
};

var topMeteo = new Meteo(document.querySelector('.js_weather'));


//Google Maps API

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
var GoogleMap = function(elem){
  var map;
  this.initialize = function(latitude,longitude) {
    var mapOptions = {
      zoom: 15,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    };
    map = new google.maps.Map(elem, mapOptions);

    // Try HTML5 geolocation
    if(latitude && longitude) {
      var pos = new google.maps.LatLng(latitude,longitude);

      var marker = new google.maps.Marker({
        map: map,
        position: pos,
      });
      
      // Google Places
      /*var request = {
        location: pos,
        radius: 5000,
        types: ['subway_station', 'transit_station', 'train_station']
      };
      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, this.places);*/

      map.setCenter(pos);
    } else if(e.detail === false){
      this.handleNoGeolocation(true);
    } else {
      // Browser doesn't support Geolocation
      thihandleNoGeolocation(false);
    }
    elem.classList.add('loaded');
  }.bind(this);

  this.handleNoGeolocation = function(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }.bind(this);
  
 
};

var topMap = new GoogleMap(document.querySelector('.js_map-canvas'));

window.addEventListener('geoLocation', function(e){
  topMap.initialize(e.detail.latitude, e.detail.longitude);
  topMeteo.initialize(e.detail.latitude, e.detail.longitude);
});