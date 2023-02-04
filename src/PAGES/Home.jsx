import { useRef, useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import "../CSS/Home.css";
import MovieTvDesc from "./MovieTvDesc";

const API_KEY = "key";

const MOVIES_TRENDING_WEEK_QUERYY = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const TV_TRENDING_WEEK_QUERYY = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`;
const ALL_TRENDING_DAY_QUERYY = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [topMoviesTvs, setTopMoviesTvs] = useState("");
  const [mainCard, setMainCard] = useState();
  const [counter, setCounter] = useState(0);

  const trending = async () => {
    const response_movies = await fetch(`${MOVIES_TRENDING_WEEK_QUERYY}`);
    const response_tv = await fetch(`${TV_TRENDING_WEEK_QUERYY}`);
    const response_all = await fetch(`${ALL_TRENDING_DAY_QUERYY}`);
    const data_movies = await response_movies.json();
    const data_tv = await response_tv.json();
    const data_all = await response_all.json();

    data_tv.results.map((i) => {
      i.release_date = i.first_air_date;
      i.title = i.name;
    });

    data_all.results.map((i) => {
      if (i.first_air_date) {
        i.release_date = i.first_air_date;
        i.title = i.name;
      }
    });

    data_all.results.map((i) => {
      if (i.media_type === "person") {
        delete data_all.results.i;
      }
    });

    setMovies(data_movies.results);
    setTv(data_tv.results);
    setTopMoviesTvs(data_all.results);
  };
  useEffect(() => {
    trending();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMainCard(topMoviesTvs[counter]);
      console.log(counter);
      counter >= topMoviesTvs.length - 1
        ? setCounter(0)
        : setCounter(counter + 1);
    }, 8000);
  });

  if (mainCard === undefined) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="trendingApp">
      <MovieTvDesc
        title={mainCard.title}
        vote_average={mainCard.vote_average}
        release_date={mainCard.release_date}
        overview={mainCard.overview}
        backdrop_path={`https://image.tmdb.org/t/p/original/${mainCard.backdrop_path}`}
        poster={`https://image.tmdb.org/t/p/w500/${mainCard.poster_path}`}
      />

      <h2>Trending movies</h2>
      <div className="trendingMovies">
        {movies.map((movie) => (
          <MovieCard
            title={movie.title}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            media_type={movie.media_type}
            movie_id={movie.id}
            poster={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          />
        ))}
      </div>
      <h2>Trending Tv shows</h2>
      <div className="trendingTvs">
        {tv.map((tv) => (
          <MovieCard
            title={tv.name}
            vote_average={tv.vote_average}
            release_date={tv.first_air_date}
            movie_id={tv.id}
            media_type={tv.media_type}
            poster={`https://image.tmdb.org/t/p/w300/${tv.poster_path} `}
          />
        ))}
      </div>
    </div>
  );
}
