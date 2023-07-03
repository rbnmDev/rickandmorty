
// *************************** Obtener - Datos - API
async function obtenerDatosAPI() {
    try {
        let apiFetch = await fetch("https://rickandmortyapi.com/api/character");
        let apiData = await apiFetch.json();
        let dataArray = Array.from(apiData.results);
        return dataArray;
    } catch (error) {
        console.error("Error obteniendo datos de la API");
        throw error;
    }
}

// *************************** Crear perfil Random de personajes
class personaje {
    constructor(name, species, origin, image, episode) {
        this.name = name;
        this.species = species;
        this.origin = origin;
        this.image = image;
        this.episode = episode;
    }

    async personajeAleatorio() {
        try {
            let perfilPersonaje = await obtenerDatosAPI();
            let randomIndex = Math.floor(Math.random() * perfilPersonaje.length);
            let nombre = perfilPersonaje[randomIndex].name;
            let especie = perfilPersonaje[randomIndex].species;
            let origen = perfilPersonaje[randomIndex].origin.name;
            let imagen = perfilPersonaje[randomIndex].image
            let episodio = perfilPersonaje[randomIndex].episode


            const personajeRandom = new personaje(nombre, especie, origen, imagen, episodio);
            return personajeRandom;
        } catch (error) {
            console.error("Error obteniendo personaje aleatorio");
            throw error;
        }
    }
}

// *************************** Imprimir personaje en DOM
class post {
    constructor(name, species, origin, image, episode) {
        this.name = name;
        this.species = species;
        this.origin = origin;
        this.image = image;
        this.episode = episode;
        this.section = document.createElement('section');
        this.section.classList.add('wiki_post');
    }
    render() {
        this.section.innerHTML = '';

        let name = document.createElement('h2');
        name.textContent = this.name;

        let image = document.createElement('img');
        image.classList.add('post_image');
        image.src = this.image;

        let species = document.createElement('p');
        species.textContent = this.species;

        let origin = document.createElement('p');
        origin.textContent = this.origin;

        let episode = document.createElement('p');
        episode.textContent = this.episode;

        this.section.appendChild(name);
        this.section.appendChild(image);
        this.section.appendChild(species);
        this.section.appendChild(origin);
        this.section.appendChild(episode);

        const currentPath = window.location.pathname;

        if (currentPath === '/wiki.html') {
            document.body.appendChild(this.section);
        }
        
    }

}

const newRandomPost = new post();

const miPersonaje = new personaje();
miPersonaje.personajeAleatorio()
    .then(personajeRandom => {
        newRandomPost.name = personajeRandom.name;
        newRandomPost.species = personajeRandom.species;
        newRandomPost.origin = personajeRandom.origin;
        newRandomPost.image = personajeRandom.image;
        newRandomPost.episode = personajeRandom.episode;

        newRandomPost.render();
    })
    .catch(error => {
        console.error(error);
    });