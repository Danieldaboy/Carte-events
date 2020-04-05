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



async function getData(query) {
    if (query) {
		url =
			'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1) ' +
			query +
			'&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';
	}

	if (!query) {
		url =
			'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1)&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';
	}

    //let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1)" + query + "&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type "
    let response = await fetch(url)

    let data = await response.json()

    console.log(data);

    data.records.forEach(function (event) {
        // le titre de l'événement
        let title = event.fields.title

        let date = event.fields.date_description

        let price = event.fields.price_type

        // si jamais le champs latitude/longitude manque
        // on ignore cet événement
        if (!event.fields.lat_lon) {
            return;
        }

        // la latitude
        let latitude = event.fields.lat_lon[0]

        // la longitude
        let longitude = event.fields.lat_lon[1]
        // on pourrait récupérer d'autres infos..

        // pour tester, on les affiche dans la console
        console.log(title + " " + latitude + " " + longitude)

        // .. mais ce serait mieux de les afficher sur la carte !
        var marker = L.marker([latitude, longitude]).addTo(mymap);
        marker.bindPopup(title + "<br><br>" + date + "<br>" + price).openPopup();
    })
}

getData()

function onFormSubmit(event) {
    event.preventDefault();
    
    getData(searchInput.value);
}