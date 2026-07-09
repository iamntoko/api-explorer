const PEOPLE_URL = 'https://www.swapi.tech/api/people';

// Fetches data from the API and converts the response into JavaScript data.
async function fetchJson(url, errorMessage) {
    const response = await fetch(url);

    // Stops the function if the API request failed.
    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return await response.json();
}

// Creates the clickable character list on the page.
function renderCharacters(people) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';

    people.forEach((person) => {
        const li = document.createElement('li');
        li.textContent = person.name;

        // When a character is clicked, fetch and show that character's films.
        li.addEventListener('click', () => handleCharacterClick(person.url));

        characterList.appendChild(li);
    });
}


async function handleCharacterClick(characterUrl) {
    try {
        const characterData = await fetchJson(characterUrl, 'Failed to fetch character details');
        const films = characterData.result.properties.films;

        console.log(`Films for ${characterData.result.properties.name}:`, films);

        const filmList = document.getElementById('film-list');
        filmList.innerHTML = '';

        for (const filmUrl of films) {

            const filmData = await fetchJson(filmUrl, 'Failed to fetch film details');

            const li = document.createElement('li');
            li.textContent = filmData.result.properties.title;

            filmList.appendChild(li);
        }

    } catch (error) {
        console.error('Error fetching character films:', error);
    }
}


async function init() {
    try {
        const data = await fetchJson(PEOPLE_URL, 'Failed to fetch characters');
        renderCharacters(data.results); 
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

init();