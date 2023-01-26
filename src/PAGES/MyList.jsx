import MovieCard from "./MovieCard";
import MovieTvDesc from "./MovieTvDesc";
import AddToFav from "./MovieCard";
import "C:/Users/alek1/OneDrive/Documents/Programming/react/moviesRecomendationsApp/movies-rec-app/src/CSS/MyList.css";
import { useState, useEffect } from "react";
const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const QUERY_PATTERN = `https://api.themoviedb.org/3/find/{808}?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US&external_source=imdb_id`;
const EX_QUERY =
  "https://api.themoviedb.org/3/movie/12?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US";

export default function MyList() {
  function itemInMyList(title, media_type, movie_id, id) {
    return (
      <li>
        <button
          onClick={() => ShowDetails([movie_id, media_type, title, id])}
          id="heart-button"
        >
          {title}
        </button>
        <button
          className="delete-from-mylist"
          onClick={() => {
            let baza_string = JSON.parse(
              window.localStorage.getItem("favMovies")
            );
            var updateBaza = baza_string["mov"];
            const index = id;
            updateBaza.splice(index, 1);
            console.log("ZAWIERA");
            console.log(updateBaza);
            // console.log(updateBaza2);
            window.localStorage.removeItem("favMovies");
            window.localStorage.setItem(
              "favMovies",
              JSON.stringify({ mov: updateBaza })
            );

            setLoading(true);
          }}
        >
          {/* <span id="heart-button">&#9829;</span> */}
          Del form MyList
        </button>
      </li>
    );
  }

  function ShowDetails(element) {
    if (element) {
      const query = `https://api.themoviedb.org/3/${element[1]}/${element[0]}?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US`;
      console.log(element);
      FindFavMovTv(query);
    }

    return "none";
  }

  const [isLoading, setLoading] = useState(true);
  const [currDetails, setCurrDetails] = useState("");

  const [arrayToSearch, setArrayToSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const FindFavMovTv = async (query) => {
    const response_movies = await fetch(query);
    const data_movies = await response_movies.json();

    // data_movies.map((i) => {
    //   i.release_date = i.first_air_date;
    //   i.title = i.name;
    // });

    if (searchResult) {
      searchResult.push(data_movies);

      setSearchResult(searchResult);

      setLoading(false);
    }
    console.log(data_movies);
    setCurrDetails(data_movies);
  };

  useEffect(() => {
    if (window.localStorage.getItem("favMovies")) {
      let baza_string = JSON.parse(window.localStorage.getItem("favMovies"));
      const updateBaza = baza_string["mov"];
      // console.log(updateBaza);
      if (updateBaza.length > 0) {
        setArrayToSearch(updateBaza);
        setLoading(false);
      }
    }
  }, [arrayToSearch]);

  if (isLoading) {
    return (
      <h1>
        There are no movies or tvs here, click read heart button to ad some.
      </h1>
    );
  }
  // console.log(arrayToSearch);
  if (arrayToSearch.length === 0) {
    return (
      <h1>
        There are no movies or tvs here, click read heart button to ad some.
      </h1>
    );
  }

  return (
    <div className="list-fav-movies-tvs">
      {/* {currDetails.title} */}
      {currDetails ? (
        <MovieTvDesc
          title={currDetails.title}
          vote_average={currDetails.vote_average}
          release_date={currDetails.release_date}
          overview={currDetails.overview}
          backdrop_path={`https://image.tmdb.org/t/p/original/${currDetails.backdrop_path}`}
          poster={`https://image.tmdb.org/t/p/w500/${currDetails.poster_path}`}
        />
      ) : (
        " "
      )}
      <div className="details"></div>
      <ul>
        {arrayToSearch.map((item) => {
          return itemInMyList(item[2], item[1], item[0]);
        })}
      </ul>
    </div>
  );
}
