
//Image display part , Fetching API
function fetchpokemon() {
let pokecontainer = document.getElementById("allPokemon");
for (let i = 1; i <= 1025; i++) {
    let pokapi = `https://pokeapi.co/api/v2/pokemon-form/${i}/`; //Here i have taken loop to itetrates through all 1025  pokemon api and give the all pokeomn images based on like i value. that is from 1 to 1025
    //${..} interpolation in template string
    
    fetch(pokapi)  //fetch the pokemon api 
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();//parse it to JSON
    })
    .then(data => {
        let name = data.name;  //name attribute
        let image = data.sprites.front_default;  //url of image
        let types = data.types.map(typeObj => typeObj.type.name).join(", ");  //type of pokemon
        
        //html part
        let pokemon = document.createElement("pre"); 
        pokemon.innerHTML = `
        <pre>
        Name: ${name}
        Type(s): ${types}
        <img src="${image}" alt="${name} Image" width="240" height="270">
        </pre>
        `;
        
        //appends all this data in <div id="allPokemon">.
        pokecontainer.appendChild(pokemon);
    })
    .catch(error => {
        console.log(`Error fetching data for Pokémon with ID ${i}:`, error);
    });
}
}
// Call the function to fetch data when the page loads
fetchpokemon();

// Search part
document.getElementById("search").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const search = document.getElementById("poke_search").value.toLowerCase();
    const pokeContainer = document.getElementById("allPokemon");
    const allPokemon = pokeContainer.querySelectorAll("pre");

    allPokemon.forEach(pokemon => {
        const name = pokemon.innerText.toLowerCase();
        if (name.includes(search)) {
            pokemon.style.display = "block"; // Show the pokemon based on search field term
        } else {
            pokemon.style.display = "none"; // Hide the pokemon
        }
    });
});

// Show all pokemon initially when search field is empty
document.getElementById("search").reset();
