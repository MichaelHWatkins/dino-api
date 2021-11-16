import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${city}&limit=25&offset=0&rating=g&lang=en`;
      request.onload = function() {      
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
    

      request.open("GET", url, true);
      request.send();
    });
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('#searchResults').attr('src', body.data[0].images.fixed_height.url);
    }, function(error) {
      $('#searchResults').attr(`There was an error processing your request: ${error}`);
    });
  });
});

$('#random').click(function() {
  
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&q=&limit=25&offset=0&rating=g&lang=en`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }      
    };

    request.open("GET", url, true);
    request.send();
  });
  promise.then(function(response) {
    const body = JSON.parse(response);
    console.log(body.data)
    $('#randomResult').attr('src', body.data.images.fixed_height.url);    
  });
});
