"use strict"

//LOADING MESSAGE
$(document).ready(function() {
    $('#loading').text('Loading...')
});

//MOVIE DATABASE URL
const movieUrl = 'https://chrome-cold-dryosaurus.glitch.me/movies'

//GET MOVIES DATABASE
const getMovies = () => fetch(movieUrl)
    .then(res => res.json())
    .catch(console.error)


//GET MOVIE WITH ID
const getMovie = id => fetch(`${movieUrl}/${id}`)
    .then(res => res.json())
    .catch(console.error)


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


// let movieDatabase = fetch(movieUrl)
//     .then(response => response.json())
//     .then(data => data)
//     .catch(console.error)

function displayHtml() {
    getMovies().then(movies => {
        let html = "";
        for(let i = 0; i < movies.length; i += 1) {
            let movieTitle = movies[i].title;
            let movieRating = movies[i].rating;
            let movieId = movies[i].id;
            html += "<div class='card'>"
            html += `<div class='card-body' id="${movieId}">`
            html += `<h3 class='card-title'>${movieTitle}</h3>`
            html += `<h5 class='card-title'>Rating: ${movieRating}</h5>`
            html += `<h5 class='card-title ' id="hideId">${movieId}</h5>`
            html += "<button class=\"btn btn-primary editBtn\" type='button'>Edit</button>"
            html += "<button class=\"btn btn-primary deleteBtn\" type='button'>Delete</button>"
            html += "</div>"
            html += "</div>"
        }
        $('#loading').html(html)

        $('.editBtn').click(function () {
            alert("clicked")
        })
        // delete event is working but not deleting the specific ID
        $('.deleteBtn').click(function () {
            $(this).parent('div').remove();
            let movieId = $('#hideId').text();
            console.log(movieId);
            deleteMovie(movieId).then(console.log);
        })
        //add

        $('#addBtn').click((e) => {
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
            }))).then(displayHtml)
                .catch(console.error)
            e.preventDefault();
        })
    });
}
displayHtml();


//------------------------------------------------------------------------

$("#movieForm").submit(function (event) {
    event.preventDefault()


    let movie = $("#inputMovie").val()
    let result = ""
    let url = "http://www.omdbapi.com/?apikey="+omdbKey


// --------------------DATABASE MOVIE REQUESTS------------------------
    $.ajax({
        method:'GET',
        url:url+"&t="+movie,
        success:function (data){
            console.log(data)

// UPON SUCCESS DISPLAYS CHOSEN INFO AND MOVIE POSTER PULLED FROM SITE
            result = `
                
                <img style="float:left" class="img-thumbnail" width="200" height="200"
                src="${data.Poster}"/>
                <h2>${data.Title}</h2>
                <h3>${data.Year}</h3>
                <h3>${data.Actors}</h3>
                <h3>Genre: ${data.Genre}</h3>
                <h3>IMDB Rating: ${data.imdbRating}</h3>
                
                `;
            $("#result").html(result);

        }
    })
})







