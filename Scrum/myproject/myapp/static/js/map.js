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
map.on(L.Draw.Event.CREATED, function(e) {
    var layer = e.layer;
    var type = e.type;
    console.log('Es wurde ein Object hinzugefügt')
    var polygon_coordinates = layer.getLatLngs()[0].map(function(point) {
        return [point.lat, point.lng];
    });
    console.log(polygon_coordinates);

    // Add other filter criteria as needed
    var filter = {
        polygon: polygon_coordinates,
        // Add other filter criteria here
    };

    // Call the fetchGeoFilteredTreeData function with the filter
    fetchGeoFilteredTreeData(filter);
   
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
            clearTreeList();
            trees.forEach(function(tree) {
                var popupContent = `<strong>Gattung:</strong> ${tree.Gattung}<br>`;
                popupContent += `<strong>Gebiet:</strong> ${tree.gebiet}<br>`;
                popupContent += `<strong>Pflanzjahr:</strong> ${tree.pflanzjahr}<br>`;
                popupContent += `<strong>Straße:</strong> ${tree.strasse}<br>`;
                var marker = L.marker([tree.lat, tree.long]).bindPopup(popupContent);
                markers.addLayer(marker);
                addToTreeList(tree);
            });
        })
        .catch(error => {
            console.error('Error fetching filtered tree data:', error.message);
        });
}

function fetchGeoFilteredTreeData(filter) {
    markers.clearLayers();
    // Senden Sie die Filterkriterien als JSON-Objekt an die Backend-URL
    fetch(`/get-polygon/${encodeURIComponent(JSON.stringify(filter))}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch filtered tree data');
            }
            return response.json();
        })
        .then(data => {
            // Verarbeiten Sie die zurückgegebenen Daten wie zuvor
            var trees = data;
            clearTreeList();
            trees.forEach(function(tree) {
                var popupContent = `<strong>Gattung:</strong> ${tree.Gattung}<br>`;
                popupContent += `<strong>Gebiet:</strong> ${tree.gebiet}<br>`;
                popupContent += `<strong>Pflanzjahr:</strong> ${tree.pflanzjahr}<br>`;
                popupContent += `<strong>Straße:</strong> ${tree.strasse}<br>`;
                var marker = L.marker([tree.lat, tree.long]).bindPopup(popupContent);
                markers.addLayer(marker);
                addToTreeList(tree);
            });
        })
        .catch(error => {
            console.error('Error fetching filtered tree data:', error.message);
        });
}

// Funktion zum Umschalten der Baumliste
function toggleTreeList() {
    var treeList = document.getElementById('treeList');
    var toggleListButton = document.getElementById('toggleListButton');

    if (treeList.style.display === 'block') {
        // Wenn die Liste angezeigt wird, verbergen
        treeList.style.display = 'none';
        // Text des Buttons ändern, wenn die Liste geschlossen ist
        toggleListButton.textContent = 'Bäume anzeigen';
    } else {
        // Wenn die Liste verborgen ist, anzeigen
        treeList.style.display = 'block';
        // Bäume nur anzeigen, wenn die Liste geöffnet wird
        showTreeList();
        // Text des Buttons ändern, wenn die Liste geöffnet ist
        updateToggleListButtonText();
    }
}

// Funktion zum Aktualisieren des Textes des Toggle-List-Buttons
function updateToggleListButtonText() {
    var treeList = document.getElementById('treeList');
    var toggleListButton = document.getElementById('toggleListButton');
    var treeCount = treeList.getElementsByTagName('li').length; // Anzahl der Bäume in der Liste
    toggleListButton.textContent = treeCount + ' Bäume anzeigen';
}



    // Ansonsten die Liste anzeigen und Bäume laden
    treeList.style.display = 'block';
    fetchFilteredTreeData(); // Hier rufen Sie Ihre Funktion auf, um die Bäume zu laden


// Funktion zum Löschen der Baumliste
function clearTreeList() {
    var treeList = document.getElementById('treeList');
    treeList.innerHTML = '';
}

// Funktion zum Hinzufügen des Baumes mit allen Parametern zur Liste
function addToTreeList(tree) {
    var treeList = document.getElementById('treeList');
    var listItem = document.createElement('li');

    // Bauminformationen in HTML-Format zusammenstellen
    var treeInfo = `
        <strong>Gattung:</strong> ${tree.Gattung}<br>
        <strong>Baumalter:</strong> ${tree.pflanzjahr}<br>
        <strong>Gebiet:</strong> ${tree.gebiet}<br>
        <strong>Straße:</strong> ${tree.strasse}<br>
        <!-- Weitere Parameter hier hinzufügen -->
    `;

    // HTML-Format als InnerHTML des Listenelements setzen
    listItem.innerHTML = treeInfo;

    // Listenelement zur Liste hinzufügen
    treeList.appendChild(listItem);
}

// Beispiel für die Verwendung: Filter nach Spitz-Ahorn Bäumen aus dem Jahr 1950

function filterTrees() {
    var gattung = document.getElementById('Gattung').value;
    var pflanzjahr = document.getElementById('pflanzjahr').value;
    var gebiet = document.getElementById('gebiet').value;
    var strasse = document.getElementById('strasse').value;

    var filter = {};

    if (gattung.trim() !== "") {
        filter["Gattung"] = gattung;
    }

    if (pflanzjahr.trim() !== "") {
        filter["pflanzjahr"] = pflanzjahr;
    }

    if (gebiet.trim() !== "") {
        filter["gebiet"] = gebiet;
    }

    if (strasse.trim() !== "") {
        filter["strasse"] = strasse;
    }

    fetchFilteredTreeData(filter);
}

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

function showEmployeeList() {
    // Anzeige der Liste aktivieren
    var employeeList = document.getElementById('employeeList');
    employeeList.style.display = 'block';
    // AJAX-Anfrage zum Abrufen der Mitarbeiterdaten
    fetch('/get_mitarbeiter/')
        .then(response => response.json())
        .then(data => {
            // Mitarbeiterliste leeren
            employeeList.innerHTML = '';
            // Mitarbeiterdaten verarbeiten und in die Liste einfügen
            data.forEach(mitarbeiter => {
                var listItem = document.createElement('li');
                listItem.textContent = mitarbeiter.vorname + ' ' + mitarbeiter.nachname;
                employeeList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching employee data:', error));
}
