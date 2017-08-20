function autocomplete(input) {
    if(!input) return
    let lat, lng
    const dropdown = new google.maps.places.Autocomplete(input)
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace()
        lat = place.geometry.location.lat()
        lng = place.geometry.location.lng()
        console.log(lat, lng)
    })
    input.on('keydown', e => {
        e.keyCode === 13 && e.preventDefault()
    })

}

export default autocomplete