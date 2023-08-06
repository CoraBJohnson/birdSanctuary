// //Create Leaflet map
// //function to create map with tile layer
// function createMap() {
//     var map = L.map('map', {
//         center: [39.59, -85.23],
//         zoom: 16,
//         maxZoom:19
//         boxZoom: false,
//         doubleClickZoom: false,
//         keyboard: false,
//         zoomControl: true
//     });
//     //add tile layer
//     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//         attribution: '&copy; Esri'
//     }).addTo(map);
//
//     //add reference tile layer
//     //add reference tile layer
//     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
//     }).addTo(map);
//
//     //call getData function within the create map function to add data to map
//     //getData(map);
//
// };
//
// // function createMap(){
// //     //create the map
//     var map = L.map('map').setView([39.59, -85.23], 16);
//
//     //add tile layer
//     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//         maxZoom: 19,
//         attribution: ' &copy; Esri'
//     }).addTo(map);
//
//     //add reference tile layer
//     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
//         maxZoom: 19,
//     }).addTo(map);
//
//
// $(document).ready(createMap);

// // function for original symbology with popups
// function symbolize(data, map){
//     L.geoJson(data, {
//         style:style,
//         onEachFeature: onEachFeature
//     })
//         .addTo(map);
//     console.log(data)
// };
//
// //Import GeoJSON data
// function getData(map){
//     //load the data
//     var data = $.ajax("data/trails.geojson", {
//         dataType: "json",
//         success: function(response){
//             //create an attributes array, base year and base viz
//             var attributes = ['namealtern','OBJECTID_1','lengthmile'];
//             var vizdata = "namealtern"
//             symbolize(response, map, attributes, vizdata);
//             symbolizeLines(data, map);
//         }
//
//     });
// };


