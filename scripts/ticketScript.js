const container = document.querySelector(".seat-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const backArrow = document.getElementById("back-arrow-2");
const moviePage = document.getElementById("movie-page");
let ticketPrice = 250;
console.log(ticketPrice);

export default async function loadMoviePoster() {
  const movies = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjZlY2YwZWVkYzkwYzZkZjk0MjE4ZjVkNDYyOWYzOSIsInN1YiI6IjY0NmJkNTczYTUwNDZlMDBlNWI3NzI4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aZ7A1KZ2obRl7jNgQFiIXf8ksBXdiciY3lXBnWbl2tY",
    },
  });
  const data = await movies.json();
  const selectedMovie = data.results.filter((movie) => {
    console.log(
      "finding movie title from local strorage:",
      localStorage.getItem("movie-title")
    );
    return movie.title === localStorage.getItem("movie-title");
  });
  console.log(selectedMovie);
  moviePoster.innerHTML = `
    <img src="https://image.tmdb.org/t/p/original/${selectedMovie[0].poster_path}"/>
    `;
  console.log(movieTitle);
  movieTitle.innerText = localStorage.getItem("movie-title");
}

//-----------------------------------------------------------------------------------------------------------------------//
populateUI();
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("seats"));
  console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  updateSelectedCount();
}
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);
  localStorage.setItem("seats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
function setMovieData(index, price) {
  localStorage.setItem("movie", index);
  localStorage.setItem("price", price);
}
//---listeners---//

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    console.log(event.target);
    event.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
const backArrawOne = document.getElementById("back-arrow-1");
backArrow.addEventListener("click", (event) => {
  const searchContainer = document.getElementById("search-container");
  searchContainer.style.display = "flex";
  moviePage.style.display = "none";
  backArrawOne.style.display = "block";
});
