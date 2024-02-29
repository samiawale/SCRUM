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

// Event listener for when an item is created
map.on('draw:created', function(e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
});

// Sample tree data
var trees = [
    { lat: 52.135533, lng: 11.627624, name: 'Baum 1' },
    { lat: 52.158533, lng: 11.627624, name: 'Baum 2' },
    { lat: 52.1490533, lng: 11.627624, name: 'Baum 3' },
    { lat: 52.149053, lng: 11.620624, name: 'Baum 4' },
    { lat: 52.149053, lng: 11.633624, name: 'Baum 5' },
    { lat: 52.145533, lng: 11.627624, name: 'Baum 6' },
    { lat: 52.135533, lng: 11.630624, name: 'Baum 7' },
    { lat: 52.135533, lng: 11.623624, name: 'Baum 8' },
    { lat: 52.140533, lng: 11.627624, name: 'Baum 9' },
    { lat: 52.149053, lng: 11.620624, name: 'Baum 10' },
    // Add more tree coordinates here
];

// Add trees as markers to the map
trees.forEach(function(tree) {
    var marker = L.marker([tree.lat, tree.lng]).bindPopup(tree.name);
    markers.addLayer(marker);
});

// Get user's current location and show it on the map
map.locate({setView: true, maxZoom: 15});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
 