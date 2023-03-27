// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
script.async = true;

// Append the 'script' element to 'head'
document.head.appendChild(script);
