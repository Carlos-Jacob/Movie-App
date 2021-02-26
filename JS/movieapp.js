"use strict"
//loading

$(document).ready(function() {
    $('#loading').text('Loading...')
});


const movieUrl = 'https://rhinestone-spiced-mare.glitch.me/movies'
fetch(movieUrl)
    .then(response => response.json())
    .then(data => displayHtml(data))
        .catch(console.error);

const displayHtml = (data) => {
    let html = "";
    for(let i = 0; i < data.length; i += 1) {
        let movieTitle = data[i].title;
        let movieRating = data[i].rating;
        html += `<div>Title: ${movieTitle}</div>`
        html += `<div>Rating: ${movieRating}</div>`
    }
    $('#loading').html(html)
};

const addMovie = (e) => {
    e.preventDefault();
}