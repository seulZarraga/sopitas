$(function($){
	//Asynchronously load the map API
	var script = document.createElement('script');
	script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
	document.body.appendChild(script);
});


function initialize() {
	var map;
	var bounds = new google.maps.LatLngBounds();
	var mapOptions = {
		mapTypeId: 'roadmap'
	};
	//Display a map on the page
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	map.setTilt(45);
	//Multiple Markers
	var markers = [
	['Miravalle', 19.482056, -99.033946],
	['Chedraui', 19.483093, -99.036559]
	];
	//Info window content
	var InfoWindowContent = [
	['<div class="info-content">' + '<h6>Purificadora de miravalle</h6>' + '</div>'],
	['<div class="info-content">' + '<h6>Purificadora de Chedraui</h6>' + '</div>']
	];
	//Display multiple markers on a map
	var InfoWindow = new google.maps.InfoWindow(), marker, i;
	//Loop through our array of markers & place each one on the map
	for(i=0; i < markers.length; i++) {
		var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
		bounds.extend(position);
		marker = new google.maps.Marker({
			position: position,
			map: map,
			title: markers[i][0]
		});
	//allow each marker to have an info window
		google.maps.event.addListener(marker, 'click', (function(marker, i){
			return function(){
				InfoWindow.setContent(InfoWindowContent[i][0]);
				InfoWindow.open(map, marker);
			}
		})(marker, i));
		// automatically center the map fitting all markers on the screen
		map.fitBounds(bounds);	
	}
	// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
	var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		this.setZoom(13);
		google.maps.event.removeListener(boundsListener)
	});

	// var map = new google.maps.Map(document.getElementById("map") 
	//  center: new google.maps.LatLng(19.484965, -99.048761),
	//  zoom: 13,
	//  mapTypeId: google.maps.MapTypeId.ROADMAP
}           