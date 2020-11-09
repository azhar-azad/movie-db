const API = {
    baseUrl: 'http://www.omdbapi.com',
    key: '742ce23d'
};

const BASE_API_URL = API.baseUrl + '?apikey=' + API.key;
// http://www.omdbapi.com?apikey=742ce23d

/*
We want to catch a submission of the form
and then we want to take the value
and then call a function called getMovies which will reach out to the OMDB API
API LINK: http://www.omdbapi.com/
 */

// When index.html is finished loading, following function will be called
$(document).ready(() => {

    // crate an event for when the form is submitted
    $('#searchForm').on('submit', (event) => {

        // get the search text from the form
        let searchText = $('#searchText').val();

        // find the movies for the search text
        getMovies(searchText);

        // prevent the form from actually submitting
        event.preventDefault();
    });
});

// find the movies for the search text
function getMovies(searchText) {

    // make a request to the API using axios
    searchUrl = BASE_API_URL + '&s=' + searchText;
    //http://www.omdbapi.com?apikey=742ce23d&s=searchText
    axios.get(searchUrl)
        .then((response) => {
            console.log(response);

            // keep all the search results in an array
            let movies = response.data.Search;

            showMoviesList(movies);
        })
        .catch((err) => {
            console.log(err);
        });
}

/*
I will pass data from one page to another through session storage.
 */
function movieSelected(id) {
    // save the movie id to session storage
    sessionStorage.setItem('movieId', id);

    // then go to movie.html file
    window.location = 'movie.html';
    console.log(window.location);

    return false;
}

function getMovie() {
    // grab the movieId from session storage
    let movieId = sessionStorage.getItem("movieId");

    // make a request to the API using axios
    searchbyIdUrl = BASE_API_URL + '&i=' + movieId; //http://www.omdbapi.com?apikey=742ce23d&i=movieId
    axios.get(searchbyIdUrl)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            showMovie(movie);
        })
        .catch((err) => {
            console.log(err);
        });
}

function showMoviesList(movies) {
    let output = '';
    // use jquery loop to iterate through all the items in the array
    $.each(movies, (index, movie) => {
        output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" 
                        class="btn btn-primary"
                        href="#"
                        target="_blank">Movie Details</a>
                </div>
            </div>
        `;
    });

    $('#movies').html(output);
}

function showMovie(movie) {
    let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://www.imdb.com/title/${movie.imdbID}" 
                    target="_blank" class="btn btn-primary">View in IMDB</a>
                <a href="index.html" class="btn btn-info">Back To Search</a>
            </div>
        </div>
    `;

    $('#movie').html(output);
}