"use strict"
//loading

$(document).ready(function() {
    $('#loading').text('Loading...')
});


const movieUrl = 'https://rhinestone-spiced-mare.glitch.me/movies'

let movieDatabase = fetch(movieUrl)
    .then(response => response.json())
    .then(data => data)
        .catch(console.error);


function displayHtml(movieDatabase) {
    movieDatabase.then(movies => {
        let html = "";
        for(let i = 0; i < movies.length; i += 1) {
            let movieTitle = movies[i].title;
            let movieRating = movies[i].rating;
            html += `<table class="table">`;
            html += `<thead>`;
            html += `<tr>`;
            html += `<th scope="col">Movie Title</th>`;
            html += `<th scope="col">Movie Rating</th>`;
            html += `</tr>`;
            html += `</thead>`;
            html += `<tbody>`;
            html += `<tr>`;
            html += `<td>Title: ${movieTitle}</td>`
            html += `<td>Rating: ${movieRating}</td>`
            html += `</tr>`;
            html += `</tbody>`;
            html += `</table>`;
        }
        $('#loading').html(html).hide()


    });
}
displayHtml(movieDatabase);


const searchMovie =  id =>  fetch(`${movieUrl}/${id}`)
    .then(res => res.json())
    .then( data =>  data)
    .catch(console.error);
console.log( searchMovie(15));

// $("#movieForm").submit(function (event) {
//     event.preventDefault()
//
//
//     let movie = $("#movie").val()
//     let result = ""
//     let url = "http://www.omdbapi.com/?apikey="+omdbKey
//
//
// // --------------------DATABASE MOVIE REQUESTS------------------------
//     $.ajax({
//         method: 'GET',
//         url: url + "&t=" + movie,
//         success: function (data) {
//             console.log(data)
//
// // UPON SUCCESS, DISPLAYS CHOSEN INFO AND MOVIE POSTER PULLED FROM SITE
//             result = `
//
//                 <img style="float:left" class="img-thumbnail" width="200" height="200"
//                 src="${data.Poster}"/>
//                 <h2>${data.Title}</h2>
//                 <h3>${data.Year}</h3>
//                 <h3>${data.Actors}</h3>
//                 <h3>Genre: ${data.Genre}</h3>
//                 <h3>IMDB Rating: ${data.imdbRating}</h3>
//
//                 `;
//             $("#result").html(result);
//
//         }
//     })
// })





// const addMovie = (moviesDatabase) => {
//     // e.preventDefault();
//     moviesDatabase.then(movies => {
//         let newObj = {};
//         newObj.push({
//             title: movieName,
//             rating: movieRating
//         })
//         movies = movies.concat(newObj);
//     })
// }
// addMovie(movieDatabase);

// let movieName = $('#add-movie-name').val();
// let movieRating = $("#add-rating-selection").val();
//
// const addMovie = () => fetch(movieUrl,{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         title: movieName,
//         rating: movieRating
//     },
//     console.log(movieRating))
// })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(console.error)



$('#add-submit').click((e) => {
    const movieName = $('#add-movie-name').val();
    const movieRating = $("#add-rating-selection").val();
    fetch(movieUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: movieName,
            rating: movieRating
        })
    }).then(console.log(JSON.stringify({
        title: movieName,
        rating: movieRating
    }))).catch(console.error)
    e.preventDefault();
})

$('#searchMovie').click((e) => {
    const movieName = $('#inputMovie').val();
    fetch(movieUrl,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: movieName,
            rating: movieRating
        })
    }).then(console.log(JSON.stringify({
        title: movieName,
        rating: movieRating
    }))).catch(console.error)
    e.preventDefault();
})

