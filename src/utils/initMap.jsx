const initMap = (mapContainer, center, zoom=11) => {
    const map_obj = window.L.map(mapContainer, {
      center: center,
      zoom: zoom
    });

    window.L.maptilerLayer({
      apiKey: 'cIpY5YW2swGKoC5mFkdK',
      style: window.L.MaptilerStyle.STREETS,
    }).addTo(map_obj);

    document.querySelector('.leaflet-container a img').style.display = 'none';
    document.querySelector('.leaflet-control-attribution').style.display = 'none';

    return map_obj;
}

export default initMap;