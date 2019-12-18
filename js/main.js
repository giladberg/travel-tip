'use strict'

const init = () => {
    var urlParams = new URLSearchParams(window.location.search)
        console.log(urlParams)
    
    initGVars()
    mapReady()
}

const initMap = (lat, lng) => {

    let bangalore = { lat, lng };
    map = new google.maps.Map(
        document.getElementById('map'),
        {
            center: bangalore,
            zoom: 10
        }
    );
    google.maps.event.addListener(map, 'click', function (event) {
        onAddMarker(event, map)

    });
}

const onAddMarker = (event, map) => {
    var prmUserDecision = Swal.fire({
        title: 'Are you sure to add location?',
        text: "",
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yeah!'
    })
    prmUserDecision.then((result) => {
        if (result.value) {
            addMarker(event.latLng, map);
            let pos = { lat: event.latLng.lat(), lng: event.latLng.lng() }
            setLocation(pos).then(() => {
                renderLocationsTable()
            })
            Swal.fire(
                'Added!',
                'Your location has been added.',
                'success'
            )
        }
    })
}

const onMylocation = () => {
    getLocation()
}

const getLocation = () => {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    // navigator.geolocation.watchPosition(showLocation, handleLocationError);
}

const handleLocationError = (error) => {
    const locationError = document.getElementById("#map");
    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

const showLocation = (position) => {
    let bangalore = { lat: position.coords.latitude, lng: position.coords.longitude }
    map.setCenter(new google.maps.LatLng(bangalore.lat, bangalore.lng))
    addMarker(bangalore, map)
    setLocation(bangalore).then(() => {
        renderLocationsTable()
    })
}

const onGo = () => {
    const elSearchLocation = document.querySelector('#search-location')
    searchLocation(elSearchLocation.value).then(location => {
        map.setCenter(new google.maps.LatLng(location.lat, location.lng))
        addMarker(location, map)
        setLocation(location).then(() => {
            renderLocationsTable()
        })
    })
}

const onCopyLocation = () => {
    console.log(map.center.lat())
    let userLocation={lat:map.center.lat(),lng:map.center.lng()}
    copyUrl(userLocation)
}

const copyUrl=(userLocation)=>{
    var copyText = document.getElementById("copy-text");
    copyText.style="display:block;"
    copyText.value=`https://giladberg.github.io/travel-tip/?lat=${userLocation.lat}&lng=${userLocation.lng}`
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    copyText.style="display:none;"
}