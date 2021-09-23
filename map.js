// Initialize and add the map
function initMap() {
    // The location of Uluru
    const theLocation = { lat: 45.344, lng:-105.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: theLocation,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: theLocation,
      map: map,
    });
  }
  