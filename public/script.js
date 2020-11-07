const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data));

console.log(restaurants);

function findMatches(wordToMatch) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.owner.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value);
    console.log("i'm trying to display matches!");
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}</span><br>
                <span class="hand_washing">${'Owner: ' + place.owner}</span><br>
                <span class="address">${place.address_line_1}, ${place.address_line_2}, ${place.city}, ${place.state}, ${place.zip}</span><br>
                <span class="category">${place.category}</span><br>
                <span class="hand_washing">${'Hand Washing: ' + place.proper_hand_washing}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
    console.log("I reached here.");


}

const searchInput = document.querySelector('.searchInput');
const suggestions = document.querySelector('.filteredList');

searchInput.addEventListener('change', findMatches);
searchInput.addEventListener('keyup', findMatches);
searchInput.addEventListener('keyup', displayMatches);