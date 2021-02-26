"use strict"
//loading

$(document).ready(function() {
    $('#loading').text('Loading')
});


const movieUrl = 'https://rhinestone-spiced-mare.glitch.me/movies'
fetch(movieUrl)
    .then(response => response.json())
    .then(data => console.log(data))
        .catch(console.error);

