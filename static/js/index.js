function updateData() {
  crime = d3.select("#dropdown").property("value")
 
  d3.json("/offense/" + crime).then(data => {
  console.log(data)
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
    }

d3.selectAll("#dropdown").on("change", updateData)

updateData()


d3.json('/heatMap').then(data=> {
     console.log(data)
     let heatArray2019 = [];
     let heatArray2020 = [];
     let heatArray2021 = [];
     let markerLength = 1000;

    var green = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

   var red = new L.Icon({
   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
 });

 var blue = new L.Icon({
 iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
 shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
 shadowSize: [41, 41]
});

var orange = new L.Icon({
iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
shadowSize: [41, 41]
 });
    
        
        
for (let i = 0; i < markerLength; i++) {
  loc = data[i]
  console.log(loc)
  lat = loc[1]
  long = loc[2]
  offense = loc[0]
  date = loc[3]
  if (date == '2019') {
    heatArray2019.push(
     L.marker([lat, long], {icon: determineColor(offense)}));
    }
    else if (date == '2020') {
      heatArray2020.push(
        L.marker([lat, long], {icon: determineColor(offense)}));
    }
    else {
      heatArray2021.push(
        L.marker([lat, long], {icon: determineColor(offense)})
      );
    }

  }

 function determineColor(offense) {
        if ( offense == 'FAMILY DISTURBANCE') {
          return red;
        } else if ( offense == 'THEFT') {
          return orange;
        } else if (offense == 'CRIMINAL MISCHIEF') {
          return blue;
        }
        else {
            return green;
        }
      }
      

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let baseMaps = {
  Street: street
}


let crimeLayer2019 = L.layerGroup(heatArray2019);
let crimeLayer2020 = L.layerGroup(heatArray2020);
let crimeLayer2021 = L.layerGroup(heatArray2021);
let myMap = L.map("heatMap", {
  center: [30.2849, -97.7341],
  zoom: 6,
  layers: [street, crimeLayer2019, crimeLayer2020, crimeLayer2021]
});

//   // Overlays that can be toggled on or off
let overlayMaps = {
  crime2019: crimeLayer2019, 
  crime2020: crimeLayer2020,
  crime2021: crimeLayer2021
};
L.control.layers(baseMaps, overlayMaps).addTo(myMap);



// let myMap = L.map("heatMap", {
//   center: [46.2276, 2.2137],
//   zoom: 6,
//   layers: [street, crimeLayer]
// });
// L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
// });

})