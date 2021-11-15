import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${city}&limit=25&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        const giphyURL = response.data[0].images.fixed_height.url;
        getElements(giphyURL);
      }
    };

    request.open("GET", url, true);
    request.send();

   function getElements(giphyURL) {
      $('#searchResults').attr('src', giphyURL);
    }
  });

  $('#random').click(function() {
    const city = $('#location').val();
    $('#location').val("");
    
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&q=&limit=25&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        const giphyURL1 = response.data.images.fixed_height.url;
        getElements(giphyURL1);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(giphyURL1) {
      $('#randomResult').attr('src', giphyURL1);
    }
  });
});