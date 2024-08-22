const initMap = (mapContainer, center) => {
    const map_obj = window.L.map(mapContainer, {
      center: center,
      zoom: 11
    });

    window.L.maptilerLayer({
      apiKey: 'cIpY5YW2swGKoC5mFkdK',
      style: window.L.MaptilerStyle.STREETS,
    }).addTo(map_obj);

    return map_obj;
}

export default initMap;