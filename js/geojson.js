//function to create sequence controls
function createSequenceControls(map, attributes){
    //create range input element/slider
    $('#panel').append('<input class = "range-slider" type = "range" >');
    // add slider attributes
    $('.range-slider').attr({
        max: 15,
        min:0,
        value: 0,
        step: 1
    });

    //add skip buttons
    $('#panel').append('<button class="skip" id ="reverse">Reverse</button>');
    $('#panel').append('<button class="skip" id ="forward">Skip</button>');

};

//create facility markers
var facilityMarkerOptions = {
    radius: 8,
    color: "navy",
    fillColor: "#8c92ac",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
    };
//create sighting markers
var sightingMarkerOptions = {
    radius: 8,
    color: "#d38b18",
    fillColor: "#FFD580",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
};
//create markers
var reportMarkerOptions = {
    radius: 8,
    color: "#b7c0af",
    weight: 3,
    opacity: 1,
    fillOpacity:1
};

//function to calculate the radius for each proportional symbol
function calcPropRadius(attValue){
    //scale factor to adjust symbol size evenly
    var scaleFactor=1000;
    //scaled value/area based on attribute value and scale factor
    var area= attValue / scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
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
    //add osm base tile layer
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

};

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
                        //examine attribute value to check that it is correct
                        console.log(feature.properties, attValue);
                        //give each feature's marker a radius based on attribute value
                        //geojsonMarkerOptions.radius = calcPropRadius(attValue);
                        //create layer with marker options
                        var layer = L.circleMarker(latlng, facilityMarkerOptions);
                        //create attributes array
                        //var attributes = processData(response);

                        //add panel content string
                        var panelContent = "<p><b>Facility: </b>" + feature.properties.Name + "</p>";

                        //add formated attribute to panel content string
                        var year = attribute.split("AA")[1];
                        panelContent += "<p><b>Facility Type:</b> " + feature.properties.FacilityType + " </p>";

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
                        //examine attribute value to check that it is correct
                        console.log(feature.properties, attValue);
                        //give each feature's marker a radius based on attribute value
                        //geojsonMarkerOptions.radius = calcPropRadius(attValue);
                        //create layer with marker options
                        var layer = L.circleMarker(latlng, sightingMarkerOptions);
                        //create attributes array
                        //var attributes = processData(response);

                        //add panel content string
                        var panelContent = "<p><b>Facility: </b>" + feature.properties.Name + "</p>";

                        //add formated attribute to panel content string
                        var year = attribute.split("AA")[1];
                        panelContent += "<p><b>Facility Type:</b> " + feature.properties.FacilityType + " </p>";

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
                        //examine attribute value to check that it is correct
                        console.log(feature.properties, attValue);
                        //give each feature's marker a radius based on attribute value
                        //geojsonMarkerOptions.radius = calcPropRadius(attValue);
                        //create layer with marker options
                        var layer = L.circleMarker(latlng, reportMarkerOptions);
                        //create attributes array
                        //var attributes = processData(response);

                        //add panel content string
                        var panelContent = "<p><b>Facility: </b>" + feature.properties.Name + "</p>";

                        //add formated attribute to panel content string
                        var year = attribute.split("AA")[1];
                        panelContent += "<p><b>Facility Type:</b> " + feature.properties.FacilityType + " </p>";

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








