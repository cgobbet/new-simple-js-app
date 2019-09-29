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
