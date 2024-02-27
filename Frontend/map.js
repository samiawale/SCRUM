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
     html: '<?xml version="1.0" ?><svg height="72.779755" id="svg8" version="1.1" viewBox="0 0 15.54171 19.256311" width="58.740318" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs2"><clipPath clipPathUnits="userSpaceOnUse" id="clipPath23"><rect height="170.00711" id="rect25" style="opacity:1;fill:none;fill-opacity:1;stroke:#000000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:0.97641512" transform="rotate(90)" width="263.84616" x="6.7847877" y="110.36194"/></clipPath></defs><g id="layer1" transform="translate(20.440439,-562.67295)"><rect height="58.184261" id="rect8011" ry="1.1433572" style="opacity:1;fill:none;fill-opacity:1;stroke:none;stroke-width:1.10699999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" width="150.11761" x="-377.22021" y="-198.90477"/></g><g id="g8681" transform="translate(20.440439,-562.67295)"><rect height="58.184261" id="rect8677" ry="1.1433572" style="opacity:1;fill:none;fill-opacity:1;stroke:none;stroke-width:1.10699999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" width="150.11761" x="-377.22021" y="-198.90477"/></g><g id="g9233" transform="translate(20.440439,-562.67295)"><rect height="58.184261" id="rect9229" ry="1.1433572" style="opacity:1;fill:none;fill-opacity:1;stroke:none;stroke-width:1.10699999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" width="150.11761" x="-377.22021" y="-198.90477"/><rect height="368.83194" id="rect9311" ry="1.1433572" style="opacity:1;fill:none;fill-opacity:1;stroke:none;stroke-width:1.10699999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" width="313.2399" x="-594.38983" y="-161.63449"/><ellipse cx="-12.584727" cy="581.61816" id="path981-7-0-6-1-3-8-1-1-9-4" rx="3.877409" ry="0.31109855" style="opacity:1;fill:#b3b3b3;fill-opacity:1;stroke:none;stroke-width:0.79707766;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/><path d="m -14.880006,581.25993 h 4.700133" id="path977-8-5-8-4-7-9-1-2-3-0" style="opacity:1;fill:none;fill-opacity:1;stroke:#241f1c;stroke-width:0.51981038;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/><path d="m -12.9673,581.12637 -0.03555,-10.57639 1.16988,-1.1e-4 0.06837,10.56744 z" id="path979-8-6-6-8-0-8-6-3-4-6-7" style="opacity:1;fill:#784421;fill-opacity:1;stroke:#241f1c;stroke-width:0.64406514;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"/><path d="m 393.15348,159.08893 c 2.33057,1.58479 3.29069,8.13676 3.81804,10.90534 0.52734,2.76859 2.04306,9.21473 0.45827,11.5453 -1.58479,2.33058 -8.13676,3.29069 -10.90534,3.81804 -2.76858,0.52735 -9.21472,2.04307 -11.5453,0.45827 -2.33057,-1.58479 -3.29069,-8.13676 -3.81804,-10.90534 -0.52735,-2.76858 -2.04306,-9.21472 -0.45827,-11.5453 1.58479,-2.33057 8.13676,-3.29068 10.90534,-3.81803 2.76858,-0.52735 9.21472,-2.04307 11.5453,-0.45828 z" id="path7154-0-2" style="opacity:1;fill:#2ca02c;fill-opacity:1;stroke:#241f1c;stroke-width:2.95041895;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" transform="matrix(0.33946247,0.06220382,-0.06220382,0.33946247,-129.6019,489.80961)"/><path d="m 393.15348,159.08893 c 2.33057,1.58479 3.29069,8.13676 3.81804,10.90534 0.52734,2.76859 2.04306,9.21473 0.45827,11.5453 -1.58479,2.33058 -8.13676,3.29069 -10.90534,3.81804 -2.76858,0.52735 -9.21472,2.04307 -11.5453,0.45827 -2.33057,-1.58479 -3.29069,-8.13676 -3.81804,-10.90534 -0.52735,-2.76858 -2.04306,-9.21472 -0.45827,-11.5453 1.58479,-2.33057 8.13676,-3.29068 10.90534,-3.81803 2.76858,-0.52735 9.21472,-2.04307 11.5453,-0.45828 z" id="path7154-0" style="opacity:1;fill:#37c837;fill-opacity:1;stroke:#241f1c;stroke-width:2.95041895;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" transform="matrix(0.33946247,0.06220382,-0.06220382,0.33946247,-132.52507,485.29571)"/><path d="m 393.15348,159.08893 c 2.33057,1.58479 3.29069,8.13676 3.81804,10.90534 0.52734,2.76859 2.04306,9.21473 0.45827,11.5453 -1.58479,2.33058 -8.13676,3.29069 -10.90534,3.81804 -2.76858,0.52735 -9.21472,2.04307 -11.5453,0.45827 -2.33057,-1.58479 -3.29069,-8.13676 -3.81804,-10.90534 -0.52735,-2.76858 -2.04306,-9.21472 -0.45827,-11.5453 1.58479,-2.33057 8.13676,-3.29068 10.90534,-3.81803 2.76858,-0.52735 9.21472,-2.04307 11.5453,-0.45828 z" id="path7154-0-2-2" style="opacity:1;fill:#5fd35f;fill-opacity:1;stroke:#241f1c;stroke-width:2.95041895;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" transform="matrix(0.33946247,0.06220382,-0.06220382,0.33946247,-135.03507,489.80961)"/></g></svg>'  });

 // Add markers for trees
 var trees = [
     { lat: 52.135533, lng: 11.627624, name: 'Baum 1' },
     { lat: 52.158533, lng: 11.627624, name: 'Baum 2' },
     { lat: 52.1490533, lng: 11.627624, name: 'Baum 3' },
     { lat: 52.136533, lng: 11.627624, name: 'Baum 8' },
     { lat: 52.137533, lng: 11.628624, name: 'Baum 9' },
     { lat: 52.138533, lng: 11.629624, name: 'Baum 10' },
     { lat: 52.139533, lng: 11.630624, name: 'Baum 11' },
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
 });

 map.addLayer(markers);