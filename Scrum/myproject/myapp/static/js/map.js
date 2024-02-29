var map = L.map('map').setView([52.120533, 11.627624], 12);

// Tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker cluster group
var markers = L.markerClusterGroup();
map.addLayer(markers);

// Feature group for drawn items
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialize the draw control and pass it to the map
var drawControl = new L.Control.Draw({
    draw: {
        polyline: true,
        polygon: true,
        circle: true,
        marker: true,
        circlemarker: true,
        rectangle: true
    },
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

// Function to fetch tree data from the GeoPlot API
function fetchTreeData() {
    fetch('/get-geoplot/')  // Adjust the URL to match your endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch tree data');
            }
            return response.json();
        })
        .then(data => {
            // Slice the first 100 trees
            var trees = data.slice(0, 100);
            // Add trees as markers to the map
            trees.forEach(function(tree) {
                var marker = L.marker([tree.lat, tree.long]).bindPopup(tree.name);
                markers.addLayer(marker);
            });
        })
        .catch(error => {
            console.error('Error fetching tree data:', error.message);
        });
}

// Call the fetchTreeData function to load tree data and display it on the map
fetchTreeData();

// Event listener for when an item is created
map.on('draw:created', function(e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
});

// Function to handle location found
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

// Function to handle location error
function onLocationError(e) {
    alert(e.message);
}

// Listen for location found and error events
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
