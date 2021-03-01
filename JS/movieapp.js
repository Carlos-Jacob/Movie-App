"use strict"

//LOADING MESSAGE
$(document).ready(function() {
    $('#loading').text('Loading...')
});

//MOVIE DATABASE URL
const movieUrl = 'https://rhinestone-spiced-mare.glitch.me/movies'

//GET MOVIES DATABASE
const getMovies = () => fetch(movieUrl)
    .then(res => res.json())
    .catch(console.error)

getMovies().then(movies => console.log(movies));

//GET MOVIE WITH ID
const getMovie = id => fetch(`${movieUrl}/${id}`)
    .then(res => res.json())
    .catch(console.error)

getMovie(1).then(movie => console.log(movie));

//EDIT MOVIE FUNCTION
const editMovie = movie => fetch(`${movieUrl}/${movie.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {console.log(`Success: edited${JSON.stringify(data)}`)})
    .catch(console.error);

//DELETE MOVIE FUNCTION
const deleteMovie = id => fetch(`${movieUrl}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json'
    },
})
    .then(res => res.json())
    .then(() => {
        console.log(`Success: deleted movie with id of ${id}`)})
    .catch(console.error)

// deleteMovie(4).then(console.log);


// ADD MOVIE FUNCTION
const addMovie = movie => fetch(`${movieUrl}`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {console.log(`Success: created ${JSON.stringify(data)}`)
    return data.id;
    })
    .catch(console.error)

addMovie("Jacob").then(console.log);



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
// displayHtml();


//------------------------------------------------------------------------

$("#movieForm").submit(function (event) {
    event.preventDefault()


    let movie = $("#inputMovie").val()
    let result = ""



// // --------------------DATABASE MOVIE REQUESTS------------------------

    $.ajax({
        method: 'GET',
        url: "https://rhinestone-spiced-mare.glitch.me/movies/" + movie ,
        success: function (data) {
            console.log(data)

// UPON SUCCESS, DISPLAYS CHOSEN INFO AND MOVIE POSTER PULLED FROM SITE

            result = `

               
                <h2>${data.title}</h2>
               
               
              

                `;
            $("#result").html(result);


        }
    })
})




//------- PULL VALUE AND SEARCH FOR MOVIE POSTER / DATA FROM OMDB----------------

// $.ajax({
//     method:'GET',
//     url:url+"&t="+movie,
//     success:function (data){
//         console.log(data)
//
// // UPON SUCCESS DISPLAYS CHOSEN INFO AND MOVIE POSTER PULLED FROM SITE
//         result = `
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
//         $("#result").html(result);
//
//     }
// })
//
//
//
//
// })


// $('#add-submit').click((e) => {
//     const movieName = $('#add-movie-name').val();
//     const movieRating = $("#add-rating-selection").val();
//     fetch(movieUrl,{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title: movieName,
//             rating: movieRating
//         })
//     }).then(console.log(JSON.stringify({
//         title: movieName,
//         rating: movieRating
//     }))).catch(console.error)
//     e.preventDefault();
//     displayHtml();
// })


