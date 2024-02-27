 // Define bounds for Magdeburg, Germany
 var magdeburgBounds = L.latLngBounds([48.0625, 8.5519], [55.1754, 15.7563]);

 var map = L.map('map', {
     center: [52.120533, 11.627624],
     zoom: 12,
     maxBounds: magdeburgBounds, // Set maximum bounds for the map
     minZoom: 12 // Set minimum zoom level to avoid zooming out of bounds
 });

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 // Function to update icon size based on zoom level
 function updateIconSize() {
     var zoomLevel = map.getZoom();
     var newSize = 24 + (zoomLevel - 12) * 4; // Adjust size based on zoom level
     treeIcon.options.iconSize = [newSize, newSize];
 }

 // Add custom icon for tree marker
 var treeIcon = L.divIcon({
     className: 'custom-icon',
     html: '<svg height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c1.657 0 3 1.343 3 3 0 1.33-1.086 2.736-2.675 3.804-1.053.77-2.191 1.18-3.325 1.964-1.132-.785-2.271-1.194-3.325-1.964-1.589-1.068-2.675-2.474-2.675-3.804 0-1.657 1.343-3 3-3z" fill="#228B22"/><path d="M12 18c1.657 0 3 1.343 3 3 0 1.33-1.086 2.736-2.675 3.804-1.053.77-2.191 1.18-3.325 1.964-1.132-.785-2.271-1.194-3.325-1.964C4.086 23.736 3 22.33 3 21c0-1.657 1.343-3 3-3z" fill="#228B22"/><path d="M12 11c1.657 0 3 1.343 3 3 0 1.33-1.086 2.736-2.675 3.804-1.053.77-2.191 1.18-3.325 1.964-1.132-.785-2.271-1.194-3.325-1.964C4.086 16.736 3 15.33 3 14c0-1.657 1.343-3 3-3z" fill="#228B22"/><path d="M12 18c1.657 0 3 1.343 3 3 0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3z" fill="#8B4513"/></svg>'
 });
 // Add markers for trees
 var trees = [
     { lat: 52.135533, lng: 11.627624, name: 'Baum 1' },
     { lat: 52.158533, lng: 11.627624, name: 'Baum 2' },
     { lat: 52.1490533, lng: 11.627624, name: 'Baum 3' },
     { lat: 52.136533, lng: 11.627624, name: 'Baum 8' },
     { lat: 52.137533, lng: 11.628624, name: 'Baum 9' },
     { lat: 52.138533, lng: 11.629624, name: 'Baum 10' },
     { lat: 52.139533, lng: 11.630624, name: 'Baum 11' },
     { lat: 52.139533, lng: 11.630734, name: 'Baum 11' },
     { lat: 52.139533, lng: 11.630844, name: 'Baum 11' },
     { lat: 52.139533, lng: 11.640954, name: 'Baum 11' },
     { lat: 52.139533, lng: 11.641664, name: 'Baum 11' },
     { lat: 52.139533, lng: 11.732674, name: 'Baum 11' },
     { lat: 52.140533, lng: 11.631624, name: 'Baum 12' },
     { lat: 52.141533, lng: 11.632624, name: 'Baum 13' },
     { lat: 52.142533, lng: 11.633624, name: 'Baum 14' },
     { lat: 52.143533, lng: 11.634624, name: 'Baum 15' },
     { lat: 52.144533, lng: 11.635624, name: 'Baum 16' },
     { lat: 52.145533, lng: 11.636624, name: 'Baum 17' },
     { lat: 52.146533, lng: 11.637624, name: 'Baum 18' },
     { lat: 52.147533, lng: 11.638624, name: 'Baum 19' },
     { lat: 52.148533, lng: 11.639624, name: 'Baum 20' },
     { lat: 52.149533, lng: 11.640624, name: 'Baum 21' },
     { lat: 52.150533, lng: 11.641624, name: 'Baum 22' },
     { lat: 52.151533, lng: 11.642624, name: 'Baum 23' },
     { lat: 52.152533, lng: 11.643624, name: 'Baum 24' },
     { lat: 52.153533, lng: 11.644624, name: 'Baum 25' },
     { lat: 52.154533, lng: 11.645624, name: 'Baum 26' },
     { lat: 52.155533, lng: 11.646624, name: 'Baum 27' },
     { lat: 52.156533, lng: 11.647624, name: 'Baum 28' },
     { lat: 52.157533, lng: 11.648624, name: 'Baum 29' },
     { lat: 52.158533, lng: 11.649624, name: 'Baum 30' },
     { lat: 52.159533, lng: 11.650624, name: 'Baum 31' },
     { lat: 52.160533, lng: 11.651624, name: 'Baum 32' },
     { lat: 52.161533, lng: 11.652624, name: 'Baum 33' },
     { lat: 52.162533, lng: 11.653624, name: 'Baum 34' },
     { lat: 52.163533, lng: 11.654624, name: 'Baum 35' },
     { lat: 52.164533, lng: 11.655624, name: 'Baum 36' },
     { lat: 52.165533, lng: 11.656624, name: 'Baum 37' },
     { lat: 52.166533, lng: 11.657624, name: 'Baum 38' },
     { lat: 52.167533, lng: 11.658624, name: 'Baum 39' },
     { lat: 52.168533, lng: 11.659624, name: 'Baum 40' },
 ];


 var markers = L.markerClusterGroup();

 trees.forEach(function(tree) {
     var marker = L.marker([tree.lat, tree.lng]).bindPopup(tree.name);
     markers.addLayer(marker);

     var popupContent = '<p>' + tree.name + '</p><button class="water-btn">Gießen</button>';
     marker.bindPopup(popupContent);

     // Überprüfen, ob der Baum in der Nähe ist, bevor der Button hinzugefügt wird
     var distance = map.distance(map.getCenter(), [tree.lat, tree.lng]);
     if (distance <= 100) {
         marker.on('popupopen', function() {
             var popup = this.getPopup();
             var button = popup.getContent().querySelector('.water-btn');
             button.addEventListener('click', function() {
                 // Hier können Sie die Logik zum Gießen des Baums einfügen
                 marker.setIcon(L.icon({ iconUrl: 'red_tree_icon.png', iconSize: [32, 32] }));
             });
         });
     } else {
         marker.on('popupopen', function() {
             var popup = this.getPopup();
             var button = popup.getContent().querySelector('.water-btn');
             button.style.display = 'none'; // Verstecke den Button, wenn der Baum nicht in der Nähe ist
         });
     }
 });

 map.addLayer(markers);

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
 