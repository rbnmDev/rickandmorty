
// *************************** Obtener - Datos - API
async function obtenerDatosAPI() {
    try {
        let page = Math.floor(Math.random() * 42);
        let apiFetch = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
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
            let imagen = perfilPersonaje[randomIndex].image;
            let episodios = perfilPersonaje[randomIndex].episode;
            /* let episodio = episodioUrl[i].replace("https://rickandmortyapi.com/api/", ""); */

            const personajeRandom = new personaje(nombre, especie, origen, imagen, episodios);
            return personajeRandom;
        } catch (error) {
            console.error("Error obteniendo personaje aleatorio");
            throw error;
        }
    }
}

// *************************** Imprimir personaje en DOM
class post {
    constructor(name, species, origin, image, episode, url) {
        this.name = name;
        this.species = species;
        this.origin = origin;
        this.image = image;
        this.episode = episode;
        this.section = document.createElement('section');
        this.section.classList.add('wiki_post');
        this.url = url;
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

        let url = document.createElement('a');
        url.href = this.url;

        this.section.appendChild(name);
        this.section.appendChild(image);
        this.section.appendChild(species);
        this.section.appendChild(origin);
        this.section.appendChild(episode);

        const currentPath = window.location.pathname;
        if (currentPath === '/wiki.html') {
            const postSection = document.getElementById('wiki_section');
            postSection.appendChild(this.section);
        }
    }
}


for (let i = 0; i < 9; i++) {
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
}