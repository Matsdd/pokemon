window.addEventListener('load', init);

//Globals
let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1010';
let gallery;

/**
 * Initialize after the DOM is ready
 */
function init()
{
    gallery = document.getElementById('pokemon-gallery')
    getPokemonData();
}

function getPokemonData()
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
                return response.json();
        })
        .then(createPokemonCards)
        .catch(ajaxErrorHandler);
}

function createPokemonCards(data)
{
    console.log(data);
    for (let pokemon of data.results) {
        let pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.dataset.name = pokemon.name
        gallery.appendChild(pokemonCard);

    fetch(pokemon.url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(fillPokemonCard)
        .catch(ajaxErrorHandler);
}}

function fillPokemonCard(pokemon)
{
    let pokemonCard = document.querySelector(`.pokemon-card[data-name='${pokemon.name}']`);
    pokemonCard.classList.replace('pokemon-card', pokemon.types['0'].type.name);


    let title = document.createElement('h3');
    title.innerHTML = `${pokemon.name} (#${pokemon.id})`;
    pokemonCard.appendChild(title);

    let image = document.createElement('img');
    image.src = pokemon.sprites.other['official-artwork'].front_default;
    image.classList.add('pokemon-card');
    pokemonCard.appendChild(image);

    let types = document.createElement('h3');
    if (pokemon.types.length == 2) {
        types.innerHTML = pokemon.types['0'].type.name + ' / ' + pokemon.types['1'].type.name;}
    if (pokemon.types.length == 1) {
        types.innerHTML = pokemon.types['0'].type.name}
    pokemonCard.appendChild(types);
}

function ajaxErrorHandler()
{
    console.log('nou');
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorSpot.appendChild(errorMessage);
}