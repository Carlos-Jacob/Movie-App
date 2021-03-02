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
            html += "<div class='card text-white bg-dark'>"
            html += `<div class='card-body' id="${movieId}">`
            html += `<h3 class='card-title'>${movieTitle}</h3>`
            html += `<h5 class='card-title'>Rating: ${movieRating}</h5>`
            html += `<h5 class='card-title ' id="hideId">${movieId}</h5>`
            html += "<button class=\"btn btn-primary editBtn\" type='button'>Edit</button>"
            html += "<button class=\"btn btn-danger deleteBtn\" type='button'>Delete</button>"
            html += "</div>"
            html += "</div>"
        }
        $('#loading').html(html)


        // edit click event

        $('.editBtn').on('click', function (event) {
            $('#myModal').show();
        })

        $('#saveChanges').click(function (e){
            e.preventDefault();
            let editedName = $('#edit-movie-name').val();
            let editedRating = $('#edit-rating-selection').val();
            console.log(editedName);
            console.log(editedRating);
            fetch(movieUrl,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editedName,
                    rating: editedRating
                })
            }).then(console.log(JSON.stringify({
                title: editedName,
                rating: editedRating
            }))).then(displayHtml)
                .catch(console.error)
            e.preventDefault();
        })
        //     var otherProp = $('#hideId').text();
        //     $.ajax({
        //         type: "POST",
        //         url: "deleteuser.php",
        //         data: $('form.deleteuser').serialize(),
        //         success: function (msg) {
        //             $("#deleteholder").html(msg)
        //         },
        //         error: function () {
        //             $("#deleteholder").html("error")
        //         }
        //     });
        // });

        // When edit button is clicked, modal button is clicked as well

        // $('.editBtn').click(function () {
        //     $('#myBtn').click()
        //
        // })


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
                <div class="card text-white bg-dark">
                <div class="card-body">
                <img style="float:left" class="img-thumbnail" width="200" height="200"
                src="${data.Poster}"/>
                <h2 class="text-white">${data.Title}</h2>
                <h3 class="text-white">${data.Year}</h3>
                <h3 class="text-white">${data.Actors}</h3>
                <h3 class="text-white">Genre: ${data.Genre}</h3>
                <h3 class="text-white">IMDB Rating: ${data.imdbRating}</h3>
                </div>
                </div>
                `;
            $("#result").html(result);

        }
    })
})


// Modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}







