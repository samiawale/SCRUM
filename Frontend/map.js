 // Define bounds for Magdeburg, Germany
 var magdeburgBounds = L.latLngBounds([48.0625, 8.5519], [55.1754, 15.7563]);

 var map = L.map('map', {
     center: [52.120533, 11.627624],
     zoom: 12,
     maxBounds: magdeburgBounds,
     minZoom: 12
 });

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 // Funktion zum Abrufen der Baumdaten und Hinzufügen der Marker zur Karte
 fetch('/get_trees/')
     .then(response => response.json())
     .then(trees => {
         var markers = L.markerClusterGroup();
         trees.forEach(tree => {
             var marker = L.marker([tree.lat, tree.long]).bindPopup(tree.name);
             markers.addLayer(marker);
         });
         map.addLayer(markers);
     })
     .catch(error => console.error('Error fetching trees:', error));


 