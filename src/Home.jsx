import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import MainCardHome from "./MainCardHome";
import "./Home.css";

const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const API_CODE =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDAyYTRiMTJlNzQxZTkzZDdlMjBiZTVkNmY2MzRkNiIsInN1YiI6IjYzY2M2OTU5Y2VlNDgxMDBkZWU4OWU0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6zgSiWjnA_2frOOKjORgzgAHs3tbYQfd9zGi_rhct5Y";

const EXAMPLE_QUERY2 = `
https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`;

const MOVIES_TRENDING_WEEK_QUERYY =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=f402a4b12e741e93d7e20be5d6f634d6";

const TV_TRENDING_WEEK_QUERYY =
  "https://api.themoviedb.org/3/trending/tv/week?api_key=f402a4b12e741e93d7e20be5d6f634d6";

const POSTER =
  "https://image.tmdb.org/t/p/w500//s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  // const [mainCard, setMainCard] = useState({ title: "none" });
  // const [counter, setCounter] = useState(1);

  const trending = async () => {
    const response_movies = await fetch(`${MOVIES_TRENDING_WEEK_QUERYY}`);
    const response_tv = await fetch(`${TV_TRENDING_WEEK_QUERYY}`);
    const data_movies = await response_movies.json();
    const data_tv = await response_tv.json();

    setMovies(data_movies.results);
    setTv(data_tv.results);
  };

  // console.log(movies[1]);
  useEffect(() => {
    trending();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMainCard(movies[counter]);
  //     counter <= 5 ? setCounter(counter + 1) : setCounter(0);
  //   }, 3000);
  // });
  // console.log(counter);
  // console.log(mainCard);
  return (
    <div className="trendingApp">
      {/* <MainCardHome title={mainCard.title} /> */}
      {/* <button onClick={() => trending()}>REFRESH</button> */}
      <h2>Popular movies</h2>
      <div className="trendingMovies">
        {movies.map((movie) => (
          <MovieCard
            title={movie.title}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            poster={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          />
        ))}
      </div>
      <h2>Popular Tv shows</h2>
      <div className="trendingTvs">
        {tv.map((tv) => (
          <TvCard
            title={tv.title}
            vote_average={tv.vote_average}
            first_air_date={tv.first_air_date}
            poster={`https://image.tmdb.org/t/p/w300/${tv.poster_path} `}
          />
        ))}
      </div>

      {/* <MovieCard title={movies[1].title} />
      <img src={POSTER} /> */}
    </div>
  );
}
