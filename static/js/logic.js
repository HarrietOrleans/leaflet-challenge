// map and tile layer
function createMap(earthquakeMarkers) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

// Create a baseMaps object to hold the streetmap layer.
let baseMaps = {
    "Street Map": streetmap
};

// Create an overlayMaps object to hold the earthquake markers layer.
let overlayMaps = {
    "Earthquakes": earthquakeMarkers
};

// Create the map object with options.
let map = L.map("map-id", {
    center: [2, 0],
    zoom: 12,
    layers: [streetmap, earthquakeMarkers]
  });

// Create a layer control, and pass it  baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

//markers
function createMarkers(data) {
    let earthquakeMarkers = [];
}