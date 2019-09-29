//Google Maps JS
//Set Map
function initMap() {
	var myLatlng = new google.maps.LatLng(53.3333,-3.08333);
	var imagePath = 'http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png';
	var mapOptions = {
		zoom: 11,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var markers = [
		{'lat': '53.33333', 'long': '-3.08333'},
		{'lat': '53.3200', 'long': '-3.0101'},
		{'lat': '53.2100', 'long': '-3.0501'},
		{'lat': '53.234', 'long': '-3.0634'}
	];

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	//Add Markers
	markers.forEach(function(marker) {

		var location = new google.maps.LatLng(marker.lat, marker.long);

		new google.maps.Marker({
			position: location,
			map: map,
			icon: imagePath
		});
	});

	//Resize Function
	google.maps.event.addDomListener(window, "resize", function() {
		setTimeout(function(){
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		}, 300);

	});

}