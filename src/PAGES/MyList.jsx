import MovieTvDesc from "./MovieTvDesc";
import "../CSS/MyList.css";
import { useState, useEffect } from "react";
const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";

export default function MyList() {
  function itemInMyList(title, media_type, movie_id, id) {
    return (
      <li>
        <button
          onClick={() => ShowDetails([movie_id, media_type, title])}
          id="heart-button"
        >
          <p className="butTitle">{title}</p>
        </button>
        <button
          className="delete-from-mylist"
          onClick={() => {
            let baza_string = JSON.parse(
              window.localStorage.getItem("favMovies")
            );
            var updateBaza = baza_string["mov"];
            updateBaza.forEach((element) => {
              if (element[0] === movie_id && element[2] === title) {
                updateBaza.splice(updateBaza.indexOf(element), 1);
              }
            });
            window.localStorage.removeItem("favMovies");
            window.localStorage.setItem(
              "favMovies",
              JSON.stringify({ mov: updateBaza })
            );

            setLoading(true);
          }}
        >
          🗑️
        </button>
      </li>
    );
  }

  function ShowDetails(element) {
    if (element) {
      const query = `https://api.themoviedb.org/3/${element[1]}/${element[0]}?api_key=${API_KEY}&language=en-US`;
      console.log(query);
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

    if (searchResult) {
      searchResult.push(data_movies);

      searchResult.map((i) => {
        if (i.first_air_date) {
          i.release_date = i.first_air_date;
          i.title = i.name;
        }
      });

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

  if (arrayToSearch.length === 0) {
    return (
      <h1>
        There are no movies or tvs here, click read heart button to ad some.
      </h1>
    );
  }

  return (
    <div className="list-fav-movies-tvs">
      <div className="myListDesc">
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
      </div>
      <div className="details">
        <ul>
          {arrayToSearch.map((item) => {
            return itemInMyList(item[2], item[1], item[0]);
          })}
        </ul>
      </div>
    </div>
  );
}
