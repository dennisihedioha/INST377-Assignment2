const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';


const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // figure out if city or states matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex) // WHERE TO PLACE WHAT FILTERS WE WANT
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class=\"h1\">${this.value}</span>`);
        const stateyName = place.state.replace(regex, `<span class=\"h1\">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateyName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;

    // console.log(matchArray);
}

const searchInput = document.querySelector(//CLASS NAME OF FORM);
const suggestions = document.querySelector(//CLASS NAME OF UL UNDER FORM & INPUT);

searchInput.addEventListener('change', findMatches);
searchInput.addEventListener('keyup', findMatches);