import leaflet from 'leaflet'
let map;

function initMap() {
  var map = leaflet.map('map').setView([51.505, -0.09], 13);
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  console.log('🚀 ~ file: index.js:5 ~ initMap ~ map:', map);
  var marker = leaflet.marker([51.5, -0.09], {
    draggable: true,
  }).addTo(map);
  marker.on('dragend', function (e) {
    const pos = {
      lat: marker.getLatLng().lat,
      long: marker.getLatLng().lng,
    };
    console.log("🚀 ~ file: index.js:19 ~ pos:", pos)
    
  });
}

initMap();
console.log("yo")