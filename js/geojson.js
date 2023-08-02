//create facility markers
var facilityMarkerOptions = {
    radius: 8,
    color: "navy",
    fillColor: "#8c92ac",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
    };

var sightingMarkerOptions = {
    radius: 8,
    color: "#d38b18",
    fillColor: "#FFD580",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
    };

var reportMarkerOptions = {
    radius: 8,
    color: "#b7c0af",
    weight: 3,
    opacity: 1,
    fillOpacity:1
    };

//function to create map with tile layer
function createMap() {
    var map = L.map('map', {
        center: [39.588, -85.235],
        zoom: 15,
        boxZoom: false,
        doubleClickZoom: false,
        keyboard: false,
        zoomControl: true
    });
    //add tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri'
    }).addTo(map);

    //add reference tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(map);

    //call getData function within the create map function to add data to map
    getFacilities(map);
    getSightings(map);
    getReports(map);
    symbolizeLines(data, map);

};

var sanctuaryStyle = {
    "color" : "#ff7800",
    "weight": 5,
    "opacity": 1
}

//~~~~~~~~~~~~~~~~~~
function style2(feature) {
    return {
        weight: 1,
        opacity: 1,
        color: "#6E6E6E",
        fillOpacity: 0
    };
}

// function for original Country Lines
function symbolizeLines(data, map){
    $.getJSON("data/trails.geojson" ,function(data2){
        // L.geoJson function is used to parse geojson file and load on to map
        L.geoJson(data2, {
            style:style2
        }).addTo(map);
        console.log(data2)
    });
};

// //create getData function to get data and place it one the map
// function getTrails(map) {
//     //load the data with ajax
//     $.ajax("data/trails.geojson", {
//             dataType: "json",
//             success: function (data) {
//                 //create leaflet GeoJson layer with markers and add it to the map
//                 L.geoJson(data, {
//                     style: trailStyle
//                 }).addTo(map);
//             }
//         });
// };
//~~~~~~~~~~~~~~~~~~~~~~~~
//create getData function to get data and place it one the map
function getFacilities(map) {
    //determine attribute to visualize with proportional symbols
    var attribute = "Name"

    //load the data with ajax
    $.ajax("data/facilities.geojson",
        {
            dataType: "json",
            success: function (data) {
                //create leaflet GeoJson layer with markers and add it to the map
                L.geoJson(data, {
                    pointToLayer: function (feature, latlng) {
                        //for each feature, determine value for attribute
                        var attValue = Number(feature.properties[attribute]);

                        //create layer with marker options
                        var layer = L.circleMarker(latlng, facilityMarkerOptions);

                        //create popup content string
                        var popupContent = feature.properties.Name;
                        //bind popups to circle markers
                        layer.bindPopup(popupContent)

                        //listeners to open popup on hover
                        layer.on({
                            mouseover: function () {
                                this.openPopup();
                            },
                            mouseout: function () {
                                this.closePopup()
                            },
                            click: function(){
                                $("#panel").html(panelContent);
                            }
                        });
                        //return circle markers to L.geoJson pointToLayer
                        return layer;
                createSequenceControls(map);
                    }
                }).addTo(map);
            }
        });
};

//~~~~~~~~~~~~~~~~~~~~~~~

//create getSightings function to get bird sightings and place it one the map
function getSightings(map) {
    //determine attribute to visualize with proportional symbols
    var attribute = "Species"

    //load the data with ajax
    $.ajax("data/birdSightings.geojson",
        {
            dataType: "json",
            success: function (data) {
                //create leaflet GeoJson layer with markers and add it to the map
                L.geoJson(data, {
                    pointToLayer: function (feature, latlng) {
                        //for each feature, determine value for attribute
                        var attValue = Number(feature.properties[attribute]);

                        //create layer with marker options
                        var layer = L.circleMarker(latlng, sightingMarkerOptions);

                        //create popup content string
                        var popupContent = feature.properties.Name;
                        //bind popups to circle markers
                        layer.bindPopup(popupContent)

                        //listeners to open popup on hover
                        layer.on({
                            mouseover: function () {
                                this.openPopup();
                            },
                            mouseout: function () {
                                this.closePopup()
                            },
                            click: function(){
                                $("#panel").html(panelContent);
                            }
                        });
                        //return circle markers to L.geoJson pointToLayer
                        return layer;
                        createSequenceControls(map);
                    }
                }).addTo(map);
            }
        });
};

//~~~~~~~~~~~~~~~~~~~~~~~~

//create getReports function to get trail reports and place it one the map
function getReports(map) {
    //determine attribute to visualize with proportional symbols
    var attribute = "ReportType"

    //load the data with ajax
    $.ajax("data/trailReports.geojson",
        {
            dataType: "json",
            success: function (data) {
                //create leaflet GeoJson layer with markers and add it to the map
                L.geoJson(data, {
                    pointToLayer: function (feature, latlng) {
                        //for each feature, determine value for attribute
                        var attValue = Number(feature.properties[attribute]);

                        //create layer with marker options
                        var layer = L.circleMarker(latlng, reportMarkerOptions);

                        //create popup content string
                        var popupContent = feature.properties.Name;
                        //bind popups to circle markers
                        layer.bindPopup(popupContent)

                        //listeners to open popup on hover
                        layer.on({
                            mouseover: function () {
                                this.openPopup();
                            },
                            mouseout: function () {
                                this.closePopup()
                            },
                            click: function(){
                                $("#panel").html(panelContent);
                            }
                        });
                        //return circle markers to L.geoJson pointToLayer
                        return layer;
                        createSequenceControls(map);
                    }
                }).addTo(map);
            }
        });
};




$(document).ready(createMap);








