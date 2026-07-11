const PEOPLE_URL = 'https://www.swapi.tech/api/people';

// Fetches data from the API and converts the response into JavaScript data.
async function fetchJson(url, errorMessage) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return await response.json();
}

// Displays an error message in the specified container.
function showError(container, message) {
    container.innerHTML = `<p>${message}</p>`;
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

// Fetches and displays all films for the selected character.
async function renderFilms(filmUrls) {
    const filmList = document.getElementById('film-list');
    filmList.innerHTML = '';

    for (const filmUrl of filmUrls) {
        try {

            const filmData = await fetchJson(filmUrl, 'Failed to fetch film details');
            
            const li = document.createElement('li');
            li.textContent = filmData.result.properties.title;

            li.addEventListener('click', () => handleFilmClick(filmUrl));

            filmList.appendChild(li);
        } catch (error) {
            console.error('Error fetching film details:', error);
        }
    }
}

// Fetches the selected character and passes their films to the renderer.
async function handleCharacterClick(characterUrl) {
    try {
        const characterData = await fetchJson(characterUrl, 'Failed to fetch character details');

        const films = characterData.result.properties.films;

        await renderFilms(films);

    } catch (error) {
        console.error('Error fetching character films:', error);

        const filmList = document.getElementById('film-list');

        showError(filmList, 'Could not load films for this character. Please try again.');
    }
}

// Fetches the selected film and passes its characters to the renderer.
async function handleFilmClick(filmUrl) {
    try {
        const filmData = await fetchJson(filmUrl, 'Failed to fetch film details');
        const characterUrls = filmData.result.properties.characters;

        console.log(`Characters for ${filmData.result.properties.title}:`, characterUrls);

        await renderFilmCharacters(characterUrls);

    } catch (error) {
        console.error('Error fetching film characters:', error);

        const filmCharactersList = document.getElementById('film-characters-list');

        showError(filmCharactersList, 'Could not load characters for this film. Please try again.');
    }
}

// Fetches and displays all characters in the selected film.
async function renderFilmCharacters(characterUrls) {
    const filmCharactersList = document.getElementById('film-characters-list');
    filmCharactersList.innerHTML = '';  

    for (const characterUrl of characterUrls) {
        try {
        const characterData = await fetchJson(characterUrl, 'Failed to fetch character details');

        const li = document.createElement('li');
        li.textContent = characterData.result.properties.name;

        filmCharactersList.appendChild(li);

        } catch (error) {
            console.error('Error fetching film characters:', error);
        }
    }
}

// initializes the app by fetching and rendering the list of characters.
async function init() {
    try {
        const data = await fetchJson(PEOPLE_URL, 'Failed to fetch characters');
        renderCharacters(data.results); 
    } catch (error) {
        console.error('Error initializing app:', error);

        const characterList = document.getElementById('character-list');

        showError(characterList, 'Could not load characters. Please try again.');
    }
}

init();