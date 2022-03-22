const initialLocation = {
  lat: 35.675,
  lng: 139.75,
};

const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const createMap = (onMapLoad) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      onMapLoad();
    })
    .setView({
      lat: initialLocation.lat,
      lng: initialLocation.lng,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map;
};

const addMainMarker = (map) => {
  const marker = L.marker(
    {
      lat: initialLocation.lat,
      lng: initialLocation.lng,
    },
    {
      draggable: true,
      icon: mainMarkerIcon,
    }
  );

  marker.addTo(map);

  return marker;
};

const addMarker = (location, map, popupTemplate) => {

  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng
    },
    {
      draggable: false,
      icon: markerIcon,
    }
  );

  marker.addTo(map).bindPopup(popupTemplate);

  return marker;
};


export {createMap, addMainMarker, addMarker};
