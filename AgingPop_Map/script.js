mapboxgl.accessToken = 'pk.eyJ1IjoiamlhbnRhbmNoZW4iLCJhIjoiY2t6eTdqcTlvMDh2eTJ5cGN2ZmNidDB3cSJ9.DMBNUMMjiM_PKRinfAY6kQ';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/jiantanchen/cl11oel34000a15o1unjrmsvi' // replace this with your style URL
});
map.on('load', () => {
  
const layers = [
  '5.7',
  '6.44',
  '7.17',
  '7.9',
  '8.63',
  '10.09',
  '11.55',
  '13.01',
  '14.47',
  '16.66',
  '17.4'
];
const colors = [
  '#67001f',
  '#b2182b',
  '#d6604d',
  '#f4a582',
  '#fddbc7',
  '#f7f7f7',
  '#d1e5f0',
  '#92c5de',
  '#4393c3',
  '#2166ac',
  '#053061'
];
  layers.forEach((layer, i) => {
    

  const color = colors[i];
  const key = document.createElement('div');
  key.className = 'legend-key';
  key.style.backgroundColor = color;
key.innerHTML = `${layer}`;
        if (i<=1||i>=8){
      key.style.color = "white";
    }
  legend.appendChild(key);
    
});
  map.addSource("hover", {
 type: "geojson",
 data: { type: "FeatureCollection", features: [] }
 });
   map.addLayer({
 id: "dz-hover",
 type: "line",
 source: "hover",
      layout: {},
 paint: {
 "line-color": "black",
 "line-width": 4
}
});
  map.on('mousemove', (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ['chinaland']
  });
  document.getElementById('pd').innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
     map.getSource("hover").setData({
 type: "FeatureCollection",
 features: dzone.map(function (f) {
 return { type: "Feature", geometry: f.geometry };
 })
 });
});

});
map.addControl(new mapboxgl.NavigationControl(), "top-left");
  map.addControl(
 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "top-left"
);
const geocoder = new MapboxGeocoder({
 // Initialize the geocoder
 accessToken: mapboxgl.accessToken, // Set the access token
 mapboxgl: mapboxgl, // Set the mapbox-gl instance
   marker: false, // Do not use the default marker style
 placeholder: "Search for places in China", // Placeholder text for the search bar
 proximity: {
 longitude: 116.8642,
 latitude: 39.2518
 } 
});
map.addControl(geocoder, "top-left");