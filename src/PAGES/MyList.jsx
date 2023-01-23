import MovieCard from "./MovieCard";
import { useState } from "react";
const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const QUERY_PATTERN = `https://api.themoviedb.org/3/find/{808}?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US&external_source=imdb_id`;
//Use this instead of FIND BY ID https://developers.themoviedb.org/3/movies/get-movie-details
//EXAMPLE QUERY https://api.themoviedb.org/3/find/{external_id}?api_key=<<api_key>>&language=en-US&external_source=imdb_id
//EXAMPLE WORKING QUERY https://api.themoviedb.org/3/movie/12?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US
//Maybe u can even use this in movie card, but maybe

export default function MyList() {
  const [queries, setGueries] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const SearchingFunction = async () => {
    const QUERY = QUERY_PATTERN;
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
    console.log(searchResult);
  };

  if (window.localStorage.getItem("favMovies")) {
    const favMoviesString = JSON.parse(
      window.localStorage.getItem("favMovies")
    );
    const favMoviesArray = favMoviesString["mov"];
    return (
      <>
        <p>
          {favMoviesArray.map((m) => {
            return <p>{m}</p>;
          })}
        </p>
        {/* <button onClick={() => SearchingFunction()}>asdasd</button> */}
      </>
    );
  } else {
    <h2>You do not have any favourite movies.</h2>;
  }
}
