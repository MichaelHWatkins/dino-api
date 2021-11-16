import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchService from './search-service.js'
import RandomService from './random-service.js'

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");
    
    let promise = SearchService.getSearch(city);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('#searchResults').attr('src', body.data[0].images.fixed_height.url);
    }, function(error) {
      $('#searchResults').attr(`There was an error processing your request: ${error}`);
    });
  });
});

$('#random').click(function() {
  
  let promise = RandomService.getRandom();
  promise.then(function(response) {
    const body = JSON.parse(response);
    console.log(body.data)
    $('#randomResult').attr('src', body.data.images.fixed_height.url);    
  });
});
