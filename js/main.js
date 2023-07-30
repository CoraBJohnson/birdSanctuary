//initialize Leaflet
var map = L.map('map').setView([39.59, -85.23], 16);

//add tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: ' &copy; Esri'
}).addTo(map);

//add reference tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
}).addTo(map);


