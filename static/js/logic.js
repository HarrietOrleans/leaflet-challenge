// map and tile layer
function createMap(earthquakeMarkers) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

// Create a baseMaps object to hold the streetmap layer.
let baseMaps = {"Street Map": streetmap};

// Create an overlayMaps object to hold the earthquake markers layer.
let overlayMaps = {"Earthquakes": earthquakeMarkers};

// Create the map object with options.
let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [streetmap, earthquakeMarkers]
  });

// Create a layer control, and pass it  baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

//legend
let legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  let depths = [0, 10, 30, 50, 70, 90];
  let labels = [];
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }
  return div;
};
legend.addTo(map);
}

//marker color based on depth
function getColor(depth) {
    return depth > 90 ? '#f00202' :
           depth > 70 ? '#f07502' :
           depth > 50 ? '#f09902' :
           depth > 30 ? '#f0c002' :
           depth > 10 ? '#e0f002' :
           '#4ef002';
}

//marker size based on magnitude
function getRadius(magnitude){return magnitude ? magnitude * 3 : 1;}

//markers
function createMarkers(response) {
    let earthquakes = response.features;
    let earthquakeMarkers = [];

// loop through the features to get the location of the earthquake and magnatude by size and depth.
for (let i = 0; i < earthquakes.length; i++) {
    let earthquake = earthquakes[i];
    let magnitude = earthquake.properties.mag;
    let coordinates = earthquake.geometry.coordinates;
    let long = coordinates[0];
    let lat = coordinates[1];
    let depth = coordinates[2];

 // marker with sized and color based on magnitude and depth
    let earthquakeMarker = L.circleMarker([lat, long], {
        radius: getRadius(magnitude),
        fillColor: getColor(depth),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
  }).bindPopup("<h3>" + earthquake.properties.place + "</h3><hr><p><strong>Magnitude:</strong> " + magnitude + 
               "<br/><strong>Depth:</strong> " + depth + " km</p>");

  //add marker
  earthquakeMarkers.push(earthquakeMarker);            
}

//layer with markers
createMap(L.layerGroup(earthquakeMarkers));


}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson").then(createMarkers);