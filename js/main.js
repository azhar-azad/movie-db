/*
We want to catch a submission of the form
and then we want to take the value
and then call a function called getMovies which will reach out to the OMDB API
API LINK: http://www.omdbapi.com/
 */

API_LINK = 'http://www.omdbapi.com';
API_KEY = '742ce23d';
BASE_API_URL = API_LINK + '?apikey=' + API_KEY; // http://www.omdbapi.com?apikey=742ce23d

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
    searchUrl = BASE_API_URL + '&s=' + searchText; //http://www.omdbapi.com?apikey=742ce23d&s=searchText
    axios.get(searchUrl)
        .then((response) => {
            console.log(response);

            // keep all the search results in an array
            let movies = response.data.Search;

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
                                href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });

            $('#movies').html(output);
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

    return false;
}

function getMovie() {
    // grab the movieId from session storage
    let movieId = sessionStorage.getItem("movieId");

    // make a request to the API using axios
    searchbyIdUrl = BASE_API_URL + '&t=' + movieId; //http://www.omdbapi.com?apikey=742ce23d&t=movieId
    axios.get(searchbyIdUrl)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
}