
//leaflet plot
url = "https://covid19.mathdro.id/api/confirmed"


// d3.json(url).then(function(data){


// 	// Create a map object.
// 	var myMap = L.map("map", {
// 	  center: [37.09, -95.71],
// 	  zoom: 5
// 	});

// 	// Add a tile layer.
// 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 	}).addTo(myMap);

// 	// Define a markerSize() function that will give each city a different radius based on its population.
// 	function markerSize(population) {
// 	  return Math.sqrt(population) * 150;
// 	}

	
	
// 	// Loop through the cities array, and create one marker for each city object.
// 	for (var i = 0; i < data.length; i++) {
// 		if (data[i].lat != null){
// 			var location = [data[i].lat, data[i].long]
// 			L.circle(location, {
// 			fillOpacity: 0.2,
// 			color: "orange",
// 			fillColor: "orange",
// 			// Setting our circle's radius to equal the output of our markerSize() function:
// 			// This will make our marker's size proportionate to its population.
// 			radius: markerSize(data[i].confirmed)
// 			}).bindPopup(`<h1>${data[i].combinedKey}</h1> <hr> <h3>Confirmed: ${data[i].confirmed.toLocaleString()}</h3>`).addTo(myMap);
// 		}
// 	}




// });


d3.json(url).then(function(data){

	// Define a markerSize() function that will give each city a different radius based on its population.
	function markerSize(population) {
	  return Math.sqrt(population) * 200;
	}

    // Define arrays to hold the created city and state markers.
	var cityMarkers = [];
	var cityMarkers2 = []


	// Loop through the cities array, and create one marker for each city object.
	for (var i = 0; i < data.length; i++) {
		if (data[i].lat != null){
			var location = [data[i].lat, data[i].long]
			cityMarkers.push(
			L.circle(location, {
			fillOpacity: 0.3,
			color: "",
			fillColor: "red",
			// Setting our circle's radius to equal the output of our markerSize() function:
			// This will make our marker's size proportionate to its population.
			radius: markerSize(data[i].confirmed)
			}).bindPopup(`<h1>${data[i].combinedKey}</h1> <hr> <h3>Confirmed: ${data[i].confirmed.toLocaleString()}</h3> <hr> <h3>Deaths: ${data[i].deaths.toLocaleString()}</h3>`))
		}
	}

	for (var i = 0; i < data.length; i++) {
		if (data[i].lat != null){
			var location = [data[i].lat, data[i].long]
			cityMarkers2.push(
			L.circle(location, {
			fillOpacity: 0.3,
			color: "",
			fillColor: "black",
			// Setting our circle's radius to equal the output of our markerSize() function:
			// This will make our marker's size proportionate to its population.
			radius: markerSize(data[i].deaths)
			}))
		}
	}


	var cities = L.layerGroup(cityMarkers);
	var cities2 = L.layerGroup(cityMarkers2);
	// Create an overlay object.
	var overlayMaps = {
	  "Confirmed": cities,
	  "Deaths": cities2
	};

	// Create the base layers.
	var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	})
	var Grey = L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});
	

	// Create a baseMaps object.
	var baseMaps = {
	  "Street Map": street,
	  "GrayScale Map": Grey
	};


	// Create a map object.
	var myMap = L.map("map", {
	  center: [35, 20],
	  zoom:2 ,
	  layers: [Grey, cities]
	});

	// Pass our map layers to our layer control.
	// Add the layer control to the map.
	L.control.layers(baseMaps, overlayMaps, {
	  collapsed: false
	}).addTo(myMap);

});
