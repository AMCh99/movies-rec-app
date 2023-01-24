import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const QUERY_PATTERN = `https://api.themoviedb.org/3/find/{808}?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US&external_source=imdb_id`;
const EX_QUERY =
  "https://api.themoviedb.org/3/movie/12?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US";
//Use this instead of FIND BY ID https://developers.themoviedb.org/3/movies/get-movie-details
//EXAMPLE QUERY https://api.themoviedb.org/3/find/{external_id}?api_key=<<api_key>>&language=en-US&external_source=imdb_id
//EXAMPLE WORKING QUERY https://api.themoviedb.org/3/movie/12?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US
//Maybe u can even use this in movie card, but maybe

export default function MyList() {
  const [isLoading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // const [arrayToSearch, setArrayToSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const FindFavMovTv = async (query) => {
    const response_movies = await fetch(query);
    const data_movies = await response_movies.json();

    // data_movies.results.map((i) => {
    //   i.release_date = i.first_air_date;
    //   i.title = i.name;
    // });
    // setLoading(true);
    if (searchResult && !isSearching) {
      // const xxdddd = searchResult;

      // console.log(xxdddd.includes(data_movies));
      searchResult.push(data_movies);
      // console.log(xxdddd);
      // console.log(data_movies);
      setSearchResult(searchResult);
      // console.log(searchResult);
      setLoading(false);
      // console.log(xxdddd.includes(data_movies));
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("favMovies")) {
      let baza_string = JSON.parse(window.localStorage.getItem("favMovies"));
      const updateBaza = baza_string["mov"];
      // console.log(updateBaza);
      // setArrayToSearch(updateBaza);
      // console.log(arrayToSearch);
      // console.log("ok");
      updateBaza.forEach((element) => {
        FindFavMovTv(
          `https://api.themoviedb.org/3/${element[1]}/${element[0]}?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US`
        );
      });

      // console.log(searchResult);
    }
  });

  // useEffect(() => {
  //   FindFavMovTv(
  //     `https://api.themoviedb.org/3/movie/12?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US`
  //   );
  // }, []);

  // console.log(arrayToSearch);
  // console.log(searchResult);

  let chars = searchResult;

  let uniqueChars = [];
  chars.forEach((element) => {
    if (!uniqueChars.includes(element)) {
      uniqueChars.push(element);
    }
  });

  console.log(uniqueChars);

  if (isLoading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="searchResults">
        {searchResult.length > 0 ? (
          searchResult.map((movie) =>
            movie.belongs_to_collection.poster_path ? (
              <MovieCard
                media_type={movie.title}
                title={movie.title}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                movie_id={movie.id}
                poster={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              />
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
      // <div>
      //   {searchResult.map((sr) => (
      //     <p>{sr.belongs_to_collection.name}</p>
      //   ))}
      // </div>
    );
  }
}
