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
    var $pokemonListItem = $('<li id="pokemonListItem"></li>');
    var $pokemonButton = $('<button id="pokemonButton"></button>');

    $pokemonButton.innerText = pokemon.name;

    $pokemonButton.appendTo($pokemonListItem);
    $pokemonListItem.appendTo($pokemonList);

    $pokemonListItem.addClass('pokemon-list__item');
    $pokemonButton.addClass('button-class');

    $pokemonButton.click(function(){
      showDetails(pokemon);
    });
  }

  function loadList() {
    return $.ajax(apiUrl, { dataType: 'json' }).then(function (pokemon) {
      $.each(pokemon.results, function(i, pokemon) {
      return response;
      }).then(function (json) {
      json.results.each(function (pokemon) {
        var pokemon = {
          name: pokemon.name,
          detailsurl: pokemon.url
        };
        add (pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })})
  };

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
    $modalContainer.innerHTML = '';
    // creates div for modal itself
    var $modal = $('<div id="modal"></div>');
    $modal.addClass('modal');

    // creates button to close modal and activate hideModal()
    var $modalCloseButton = $('<button id ="modalCloseButton"></button>');
    $modalCloseButton.addClass('modal-close');
    $modalCloseButton.innerText = 'Close';
    $($modalCloseButton).click(function() {
      hideModal();
    });

    var $modalPokemonName = $('<h2></h2>');
    $modalPokemonName.innerText = pokemon.name;
    /*  addClass not added as class will be "modal h2" */

    var $modalPokemonImg = $('<img></img>');
    $modalPokemonImg.src = pokemon.imageUrl;
    $modalPokemonImg.addClass('modal-img');

    var $modalPokemonHeight = $('<p id="modalPokemonHeight"></p>');
    $modalPokemonHeight.innerText = pokemon.name + " is " + (pokemon.height / 10) + "m tall!";
    /*  addClass not added as class will be "modal p" */

    $modalCloseButton.appendTo($modal);
    $modalPokemonName.appendTo($modal);
    $modalPokemonImg.appendTo($modal);
    $modalPokemonHeight.appendTo($modal);
    $modal.appendTo($modalContainer);

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

})();
/*  end of IIFE function */

// console.log(pokemonRepository);

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().$.each(function(pokemon){
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
