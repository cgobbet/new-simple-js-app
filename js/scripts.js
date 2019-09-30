var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  var $modalContainer = $('#modal-container');

  function add(pokemon) {
    if(typeof(pokemon) === 'object') {
      repository.push(pokemon);
    } else {
      alert("This is not an object");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    var $pokemonList = $('.pokemon-list');
    $('<li id="pokemonListItem"></li>').appendTo('$pokemonList');
    $('<button id="pokemonButton"></button>').appendTo('$pokemonListItem');

    var $pokemonListItem = $('#pokemonListItem');
    var $pokemonButton = $('#pokemonButton');

    $pokemonButton.innerText = pokemon.name;

    $pokemonButton.addClass('button-class');
    $pokemonListItem.addClass('pokemon-list__item');

    $('$pokemonButton').click(function(){
      showDetails(pokemon);
    });
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' }).then(function (response) {
      return response;
    }).then(function (json) {
      json.results.forEach(function (pokemon) {
        var pokemon = {
          name: pokemon.name,
          detailsurl: pokemon.url
        };
        add (pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) { // loads details of pokemons
    var url = pokemon.detailsUrl;
    return $.ajax(url, { dataType: 'json'}).then(function (response) {
      return response;
    }).then(function(details) {
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) { // retrieves details from API
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.innerHTML = '';
    // creates div for modal itself
    $('<div id="modal"></div>').appendTo('#modal-container');
    var $modal = $('#modal');
    $modal.addClass('modal');

    // creates button to close modal and activate hideModal()
    $('<button id="modal-close"></button>').appendTo('#modal');
    var $modalCloseButton = $('#modal-close');
    $modalCloseButton.addClass('modal-close');
    $modalCloseButton.innerText = 'Close';
    $('$modalCloseButton').click(function() {
      hideModal();
    });

    $('<h2 id="$modalPokemonName"></h2>').appendTo('#modal');
    var $modalPokemonName = $('#modalPokemonName');
    $modalPokemonName.innerText = pokemon.name;
    /*  addClass not added as class will be "modal h2" */

    $('<img></img>').appendTo('#modal');
    var $modalPokemonImg = $('img');
    $modalPokemonImg.src = pokemon.imageUrl;
    $modalPokemonImg.addClass('modal-img');

    $('<p id="modalPokemonHeight"></p>').appendTo('#modal');
    var $modalPokemonHeight = $('#modalPokemonHeight');
    $modalPokemonHeight.innerText = pokemon.name + " is " + (pokemon.height / 10) + "m tall!";

    $modalContainer.addClass('is-visible');
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})(); /*  end of IIFE function */

console.log(pokemonRepository);

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

// loading message function
function loading() {
  var $load = $('loading');
  if ($load.style.display === "none") {
    $load.style.display = "block";
  } else {
    $load.style.display = "none";
  }
}
