const api_Key = 'iaBarGgT3QLFcCGUavwLHM2ocQ398f8tojCVviYB'
const searchURL = 'https://api.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function createDiv(dataJson) {
    if (dataJson.addresses[1]){
        return `<div class="displayParks">
        <h2>${dataJson.fullName}</h2>
        <p>${dataJson.description}</p>
        <address>
            ${dataJson.addresses[1].line1}<br>
            ${dataJson.addresses[1].line2}
            ${dataJson.addresses[1].line3}<br>
            ${dataJson.addresses[1].city}
            ${dataJson.addresses[1].stateCode}
            ${dataJson.addresses[1].postalCode}
        </address>
        <a href="${dataJson.url}" target="_blank">More Info</a>
    </div>`
    }
    return ''

}

function loadData(dataJson) {
    $('#search-results').html(dataJson.data.map(createDiv));
}

function getParksData(state, limit){
    const params = {
        limit,
        stateCode: state,
        api_key: api_Key,
        fields: 'addresses'
    }

    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString
    fetch(url)
        .then(response => response.json()
        .then(responseJson => loadData(responseJson))
        .catch(error => console.log(error)))
}

function watchForm() {
    $('#search-form').submit(event => {
        event.preventDefault();
        const stateValue = $('#state-select').val();
        const limit = ($('#search-limit').val() || 5)-1;
        $('#search-results-h2').html("<h2>Here are the results!</h2>")
        getParksData(stateValue, limit);
    })
}

$(watchForm)