import { useState } from "react";
import MovieCard from "./MovieCard";
import "../CSS/Search.css";

const API_KEY = "key";

export default function SearchMovie() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const SearchingFunction = async () => {
    const QUERY = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`;
    const response_search = await fetch(`${QUERY}`);
    const data_search = await response_search.json();

    data_search.results.map((i) => {
      i.release_date = i.first_air_date;
      i.title = i.name;
    });

    data_search.results.map((i) => {
      i.title ? (i.title = i.title) : (i.title = i.original_title);
    });

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
      </div>
    </div>
  );
}
