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
        polyline: false,
        polygon: true,
        circle: false,
        marker: false,
        circlemarker: false,
        rectangle: false 
    },
    edit: {
        featureGroup: drawnItems
    }
});

map.addControl(drawControl);

// Event listener for when an item is created
//map.on('draw:created', function(e) 
map.on(L.Draw.Event.CREATED, function(e)
{
    var layer = e.layer;
    var type = e.type;
    console.log('Es wurde ein Object hinzugefügt')
    var polygon_coordinates = layer.getLatLngs();
    console.log(polygon_coordinates);
   
//adds item to the map 
    drawnItems.addLayer(layer);
});


// Function to fetch tree data from the GeoPlot API
function fetchFilteredTreeData(filter) {
    markers.clearLayers();
    // Senden Sie die Filterkriterien als JSON-Objekt an die Backend-URL
    fetch(`/get-geoplot/${encodeURIComponent(JSON.stringify(filter))}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch filtered tree data');
            }
            return response.json();
        })
        .then(data => {
            // Verarbeiten Sie die zurückgegebenen Daten wie zuvor
            var trees = data;
            trees.forEach(function(tree) {
                var popupContent = `<strong>Gattung:</strong> ${tree.Gattung}<br>`;
                popupContent += `<strong>Gebiet:</strong> ${tree.gebiet}<br>`;
                popupContent += `<strong>Pflanzjahr:</strong> ${tree.pflanzjahr}<br>`;
                var marker = L.marker([tree.lat, tree.long]).bindPopup(popupContent);
                markers.addLayer(marker);
            });
        })
        .catch(error => {
            console.error('Error fetching filtered tree data:', error.message);
        });
}

// Beispiel für die Verwendung: Filter nach Spitz-Ahorn Bäumen aus dem Jahr 1950

function filterTrees() {
    var treeName = document.getElementById('Gattung').value;
    var treeAge = document.getElementById('pflanzjahr').value;

    var filter = {};

    // Prüfen, ob ein Baumname eingegeben wurde
    if (treeName.trim() !== "") {
        filter["Gattung"] = treeName;
    }

    // Prüfen, ob ein Baumalter eingegeben wurde
    if (treeAge.trim() !== "") {
        filter["pflanzjahr"] = treeAge;
    }
    fetchFilteredTreeData(filter);
}
var filter = { "Gattung": "Tilia cordata, Winterlinde"};
fetchFilteredTreeData(filter);



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
