d3.json('/offense').then(data => {
    let trace1 = {
        x : data.map(row => row[0]),
        y : data.map(row => row[1]),
        type: "bar"
      }
        let data2 = [trace1]
        // Pass metric to chart title
        let layout = {
          title: `Criminal Data During Covid Times`
        };
        Plotly.newPlot("map", data2, layout);

})
function heatMap(){
// d3.json('/heatMap').then(data=> {
//     console.log(data)
//     })
let myMap = L.map("heatMap", {
    center: [30.2672, -97.7431],
            zoom: 7
        });
        // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
       //let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Water_Hydrant_WCORP_070_WA_GDA2020_Public.geojson";
       d3.json('/heatMap').then(function(response) {
        console.log(response[0]);
        features = response[0];
        let heatArray = [];
        for (let i = 0; i < features.length; i++) {
          let location = features[i];
         if (location) {
          //console.log(location);
        heatArray.push([features[1], features[2]]);
         }
         }
let heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
    }).addTo(myMap);
});
        //Create a marker layer (in the example done via a GeoJSON FeatureCollection)
//         var testlayer = L.geoJson(json);
//         var sliderControl = L.control.sliderControl({position: "topright", layer: testlayer});

// //Make sure to add the slider to the map ;-)
//         myMap.addControl(sliderControl);

// //And initialize the slider
//         sliderControl.startSlider();
         }
heatMap()