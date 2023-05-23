const movieGrid = document.getElementById("movie-grid");
const moviePage = document.getElementById("movie-page");
const backArrowOne = document.getElementById("back-arrow-1");
import posterLoader from "./ticketScript.js";
async function fetchMovies() {
  const movies = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjZlY2YwZWVkYzkwYzZkZjk0MjE4ZjVkNDYyOWYzOSIsInN1YiI6IjY0NmJkNTczYTUwNDZlMDBlNWI3NzI4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZ7A1KZ2obRl7jNgQFiIXf8ksBXdiciY3lXBnWbl2tY",
    },
  });
  const data = await movies.json();
  console.log(data.results);
  data.results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.setAttribute("title", movie.title);
    movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}"/>
    `;
    movieCard.addEventListener("click", (e) => {
      const target = e.target;
      console.log(target);
      localStorage.setItem(
        "movie-title",
        target.parentNode.getAttribute("title")
      );
      const searchContainer = document.getElementById("search-container");
      searchContainer.style.display = "none";
      moviePage.style.display = "flex";
      backArrowOne.style.display = "none";
      posterLoader();
    });
    movieGrid.appendChild(movieCard);
  });
}

fetchMovies();

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  //   console.log(searchTerm);
  const movieCards = document.querySelectorAll(".movie-card");
  movieCards.forEach((card) => {
    // console.log(card.getAttribute("title"));
    if (
      card
        .getAttribute("title")
        .toUpperCase()
        .indexOf(searchTerm.toUpperCase()) > -1
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
backArrowOne.addEventListener("click", () => {
  searchPage.classList.remove("visible");
  formContainer.classList.remove("logged-in");
});
