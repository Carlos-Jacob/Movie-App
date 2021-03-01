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
        $('#loading').html(html)
    });
}
displayHtml(movieDatabase);

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

