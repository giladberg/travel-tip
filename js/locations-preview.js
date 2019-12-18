'use strict'


const renderLocationsTable = () => {
  
    const elSavedLocation = document.querySelector('.saved-location-container');
    elSavedLocation.innerHTML = '';
    const locations = getLocationToRender();
    
    let strTable = `<table>
    <thead>
        <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Lat</th>
            <th>Lng</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
 </table>`
 elSavedLocation.innerHTML=strTable
    const elTbody=elSavedLocation.querySelector('tbody')
     locations.forEach(location => {
         
        const locationPreview = new LocationPreview(location)
        const elTr=locationPreview.render()
         elTbody.append(elTr)
    })

}
