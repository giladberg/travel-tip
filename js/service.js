'use strict'
let gLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let gLabelIndex = 0;
let gLocations = []
let gIdx;
let map;

const initGVars = () => {
    gLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    gLabelIndex = 0;
    gLocations = []
    gIdx = 1
}


const mapReady = () => {
    initMap(29.55805, 34.94821)
}
const addMarker = (location, map) => {

    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: gLabels[gLabelIndex++ % gLabels.length],
        map: map
    });
}

const setLocation = (location) => {
    let currPos = { lat: location.lat, lng: location.lng }
    let prmLocation = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currPos.lat},${currPos.lng}&key=AIzaSyAsAqgAOgYSK5tcvWVgrko0S1a8mJD4vgM`)
   return prmLocation.then(location => {
        let address = location.data.results[0].formatted_address
        let newLocation = { id: gIdx++, info: address, latlng: currPos }
        gLocations.push(newLocation)   
    })

}

const getLocationToRender=()=>{
    return gLocations
}

const searchLocation=(address)=>{
    let url =`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAsAqgAOgYSK5tcvWVgrko0S1a8mJD4vgM`
    let prmSearchLocation=axios.get(url)
    return prmSearchLocation.then(location=>{
         let userInputLocation= location.data.results[0].geometry.location
         return userInputLocation
     })
}


