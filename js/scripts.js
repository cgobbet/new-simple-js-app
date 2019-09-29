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
