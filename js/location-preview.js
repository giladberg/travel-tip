 class LocationPreview {
    constructor(location) {
        this.location = location;
    }

    render() {
        const elRow = document.createElement('tr')
    elRow.innerHTML = `<td>${this.location.id}</td>
    <td>${this.location.info}</td>
    <td>${this.location.latlng.lat}</td>
    <td>${this.location.latlng.lng}</td>`      
        return elRow;
    }
}