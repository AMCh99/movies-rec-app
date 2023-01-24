import { useState } from "react";
import MovieCard from "./MovieCard";
const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const EXAMPLE_QUERY =
  "https://api.themoviedb.org/3/search/multi?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US&page=1&include_adult=false&query=Shrek";
const START_QUERY =
  "https://api.themoviedb.org/3/search/multi?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US&page=1&include_adult=false&query=";

// const handleClick = () => {
//   setSearch();
// };

export default function SearchMovie() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const SearchingFunction = async () => {
    const QUERY = START_QUERY + search;
    console.log(QUERY);
    const response_search = await fetch(`${QUERY}`);
    const data_search = await response_search.json();

    data_search.results.map((i) => {
      i.release_date = i.first_air_date;
      i.title = i.name;
    });

    data_search.results.map((i) => {
      i.title ? (i.title = i.title) : (i.title = i.original_title);
    });

    console.log(data_search.results);
    setSearchResult(data_search.results);
  };

  return (
    <div className="searchApp">
      <div className="searchSection">
        <form>
          <h2 id="searchAmovie">Search a movie.</h2>
          <input
            value={search}
            type="text"
            id="searching"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            type="button"
            onClick={() => {
              SearchingFunction();
            }}
          >
            &#128269;
          </button>
        </form>
      </div>
      <div className="searchResults">
        {searchResult.length > 0 ? (
          searchResult.map((movie) =>
            movie.media_type === "movie" || movie.media_type === "tv" ? (
              movie.poster_path ? (
                <MovieCard
                  media_type={movie.media_type}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  movie_id={movie.id}
                  poster={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                />
              ) : (
                " "
              )
            ) : (
              " "
            )
          )
        ) : (
          <h2>No movies found</h2>
        )}

        {/* {searchResult.map((movie) => (
          <MovieCard
            title={movie.title}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            poster={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          />
        ))} */}
      </div>
    </div>
  );
}
