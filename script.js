// votre code JS


var mymap = L.map('mapid').setView([48.8534, 2.3488], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg'
}).addTo(mymap);

var marker = L.marker([48.858370, 2.294481]).addTo(mymap);
marker.bindPopup("<b>This is the Tour Eiffel</b><br>EHEHEHEH").openPopup();

var marker2 = L.marker([48.864824, 2.334595]).addTo(mymap);
marker2.bindPopup("<b>This is the Louvre</b><br>TMTC LES TABLO").openPopup();


async function getData() {
    let url = "url-de-l-api"
    let response = await fetch(url)
    let data = await response.json()
    data.records.forEach(function(event) {
    // le titre de l'événement
    let title = event.fields.title
    // la latitude
    let latitude = event.fields.lat_lon[0]
    // la longitude
    let longitude = event.fields.lat_lon[1]
    // on pourrait récupérer d'autres infos..
    // pour tester, on les affiche dans la console
    console.log(title + " " + latitude + " " + longitude)
    // .. mais ce serait mieux de les afficher sur la carte !
    })
    }
    getData()