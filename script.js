async function fetchPeople() {
    try {
        const response = await fetch('https://www.swapi.tech/api/people');
        
        if (!response.ok) {

            throw new Error('Failed to fetch people');
        }
        
        const data = await response.json();

        console.log(data.results);

        const characterList = document.getElementById('character-list');

        data.results.forEach(person => {
            const li = document.createElement('li');
            li.textContent = person.name;

            li.addEventListener('click', async (event) => {
                try {
                    const response = await fetch(person.url);

                    if (!response.ok) {
                        throw new Error('Failed to fetch person details');
                    }

                    const data = await response.json();

                    console.log(data.result.properties);

                    const filmList = document.getElementById('film-list');
                    filmList.innerHTML = '';

                    const films = data.result.properties.films;

                    for (const filmUrl of films) {
                        const response = await fetch(filmUrl);

                        if (!response.ok) {
                            throw new Error('Failed to fetch film details');
                        }
                        
                        const data = await response.json();

                        const filmLi = document.createElement('li');
                        filmLi.textContent = data.result.properties.title;
                        filmList.appendChild(filmLi);
                    } 
                }
                catch (error) {
                    console.error(error);
                }
            });

            characterList.appendChild(li);
        });
    }
    catch (error) {
        console.error(error);
    }
}


fetchPeople();
