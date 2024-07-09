import { useEffect, useState } from "react";
import StarRating from "./StarRating";

/*const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];*/

/*const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];*/

const KEY = "2abe7ae3";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleWatchedMovie(newMovie) {
    setWatched((movie) => [...movie, newMovie]);
  }

  function handleCloseMovieDetail() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function getMovieData() {
        setIsLoading(true);
        setError("");
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch!");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found!");
          }

          //console.log(data);
          setMovies(data.Search);
        } catch (error) {
          //console.log(error.message);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      getMovieData();
    },
    [query]
  );

  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <SearchResults movies={movies} />
      </nav>

      <main className="main">
        <MoviesListBox
          isOpen1={isOpen1}
          setIsOpen1={setIsOpen1}
          movies={movies}
          isLoading={isLoading}
          error={error}
          onSelectedId={handleSelectedId}
        />
        <WatchedMovieListBox
          watched={watched}
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          selectedId={selectedId}
          onSetWatchedMovie={handleWatchedMovie}
          onCloseMovieDetail={handleCloseMovieDetail}
        />
      </main>
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchInput({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function SearchResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length > 0 ? movies.length : 0}</strong> results
    </p>
  );
}

function Button({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrMsg({ errMsg }) {
  return (
    <p className="error">
      <span>😰</span>
      {errMsg}
    </p>
  );
}

function MoviesListBox({
  isOpen1,
  setIsOpen1,
  movies,
  isLoading,
  error,
  onSelectedId,
}) {
  return (
    <div className="box">
      <Button isOpen={isOpen1} setIsOpen={setIsOpen1} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrMsg errMsg={error} />
      ) : (
        isOpen1 && (
          <ul className="list list-movies">
            {movies?.map((movie) => (
              <MoviesList
                movieObj={movie}
                key={movie.imdbID}
                onSelectedId={onSelectedId}
              />
            ))}
          </ul>
        )
      )}
    </div>
  );
}

function MoviesList({ movieObj, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movieObj.imdbID)}>
      <img src={movieObj.Poster} alt={`${movieObj.Title} poster`} />
      <h3>{movieObj.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movieObj.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onSetWatchedMovie, onCloseMovieDetail }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovieDetail, setSelectedMovieDetail] = useState({});
  const [userRating, setUserRating] = useState(0);

  const {
    Actors: actors,
    Director: director,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Genre: genre,
  } = selectedMovieDetail;

  useEffect(
    function () {
      async function getMovieDetail() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();

        //console.log(data);
        setSelectedMovieDetail(data);
        setIsLoading(false);
      }

      getMovieDetail();
    },
    [selectedId]
  );

  function handleAddWatchedMovie() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onSetWatchedMovie(newMovie);

    onCloseMovieDetail();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back">&larr;</button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>
                {title} {year}
              </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB-Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={22}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAddWatchedMovie}>
                  + Add movie to watchList
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedMovieListBox({
  watched,
  isOpen2,
  setIsOpen2,
  selectedId,
  onSetWatchedMovie,
  onCloseMovieDetail,
}) {
  return (
    <div className="box">
      <Button isOpen={isOpen2} setIsOpen={setIsOpen2} />
      {selectedId ? (
        <MovieDetails
          selectedId={selectedId}
          onSetWatchedMovie={onSetWatchedMovie}
          onCloseMovieDetail={onCloseMovieDetail}
        />
      ) : (
        isOpen2 && (
          <>
            <WatchedMovieSummary watched={watched} />
            <ul className="list">
              {watched.map((movie) => (
                <WatchedMovieList movieObj={movie} key={movie.imdbID} />
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}

function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ movieObj }) {
  return (
    <li>
      <img src={movieObj.Poster} alt={`${movieObj.Title} poster`} />
      <h3>{movieObj.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movieObj.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movieObj.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movieObj.runtime} min</span>
        </p>
        <button className="btn-delete">X</button>
      </div>
    </li>
  );
}
