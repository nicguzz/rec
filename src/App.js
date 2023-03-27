import { React, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { API_KEY, API_URL } from "./api/Api.js";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MoviesList from "./components/MoviesList";

function App() {
  // state variables
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [moviesNav, setMoviesNav] = useState([]);

  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // This function makes an API call to retrieve a list of movies based on a search term or the most popular movies if no search term is provided. It sets the state variable movies to the results of the API call.

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);
  };

  // This function is similar to fetchMovies(), but it is called when the user types a search term in the search bar, and it populates the drop-down menu in the Navbar component with a list of matching movies.

  const onTypingResults = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMoviesNav(results);
  };

  // This function retrieves the details of a single movie based on its ID, including the movie trailer if available. It sets the state variables trailer and movie to the results of the API call.

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  // This function is called when a user selects a movie from the MoviesList component or the drop-down menu in the Navbar component. It calls fetchMovie() to retrieve the details of the selected movie, sets the state variables trailer and movie, and scrolls the page to the top.
  const selectMovie = async (movie) => {
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(0, 0);
  };

  // This function is called when the user submits a search query by clicking the search button or pressing enter. It calls fetchMovies() with the current value of the searchKey state variable.
  const searchMovies = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetchMovies(searchKey);
  };

  // useEffect() is used to call fetchMovies() once when the component is mounted.
  useEffect(() => {
    fetchMovies();
  }, []);

  // ------------------------------------ HTML --------------------------------

  return (
    <div>
      <div>
        <main>
          <Navbar
            setSearchKey={setSearchKey}
            searchKey={searchKey}
            setMovies={setMovies}
            movies={movies}
            selectMovie={selectMovie}
            searchMovies={searchMovies}
            onTypingResults={onTypingResults}
            moviesNav={moviesNav}
          />

          <Hero
            trailer={trailer}
            setPlaying={setPlaying}
            movie={movie}
            playing={playing}
          />
          <MoviesList selectMovie={selectMovie} movies={movies} />
        </main>
      </div>
    </div>
  );
}

export default App;
