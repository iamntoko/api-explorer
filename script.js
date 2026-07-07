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
            characterList.appendChild(li);
        });
    }
    catch (error) {
        console.error(error);
    }
}

fetchPeople();
