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
    var $pokemonListItem = $('li');
    var $pokemonButton = $('button');

    $pokemonButton.innerText = pokemon.name;

    $pokemonButton.addClass('button-class');
    $pokemonListItem.addClass('pokemon-list__item');

    $('$pokemonButton').appendTo('$pokemonListItem');
    $('$pokemonListItem').appendTo('$pokemonList');

    $('$pokemonButton').click(function(){
      showDetails(pokemon);
    });
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' }).then(function (response) {
      return response.json();
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
      return response.json();
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
    $modalContainer.innerHTML = '';
    // $('#modal-container').append('<div id='modal'></div>');
    $('<div id="modal"></div>').appendTo('#modal-container');
    var $modal = $('#modal');
    $modal.addClass('modal');

    $('<button id="modal-close"></button>').appendTo('#modal');
    var $modalCloseButton = $('#modal-close');
    $modalCloseButton.addClass('modal-close');
    $modalCloseButton.innerText = 'Close';
    $('$modalCloseButton').click(function() {
      hideModal();
    });

    $('<h2 id="$modalPokemonName"></h2>').appendTo('modal');
    var $modalPokemonName = $('#modalPokemonName');
    $modalPokemonName.innerText = pokemon.name;

    $('<img></img>').appendTo('modal');
    var $modalPokemonImg = $('img');
    $modalPokemonImg.src = pokemon.imageUrl;
    $modalPokemonImg.addClass('modal-img');

    $('<p> id="modalPokemonHeight"</p>').appendTo('modal');
    var $modalPokemonHeight = $('#modalPokemonHeight');
    $modalPokemonHeight.innerText = pokemon.name + " is " + (pokemon.height / 10) + "m tall!";

    $modalContainer.addClass('is-visible');
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }
