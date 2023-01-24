import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import MainCardHome from "./MainCardHome";
import "C:/Users/alek1/OneDrive/Documents/Programming/react/moviesRecomendationsApp/movies-rec-app/src/CSS/Home.css";
import MovieTvDesc from "./MovieTvDesc";

//https://codesandbox.io/s/stoic-hofstadter-ws3s2l?file=/src/App.js

const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const API_CODE =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDAyYTRiMTJlNzQxZTkzZDdlMjBiZTVkNmY2MzRkNiIsInN1YiI6IjYzY2M2OTU5Y2VlNDgxMDBkZWU4OWU0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6zgSiWjnA_2frOOKjORgzgAHs3tbYQfd9zGi_rhct5Y";

const MOVIES_TRENDING_WEEK_QUERYY =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=f402a4b12e741e93d7e20be5d6f634d6";

const TV_TRENDING_WEEK_QUERYY =
  "https://api.themoviedb.org/3/trending/tv/week?api_key=f402a4b12e741e93d7e20be5d6f634d6";

// const topMoviesTvs = movies;

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [topMoviesTvs, setTopMoviesTvs] = useState("");
  const [mainCard, setMainCard] = useState(topMoviesTvs[0]);
  const [counter, setCounter] = useState(0);

  // console.log(topMoviesTvs);
  const mov0 = {
    adult: false,
    backdrop_path: "/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    id: 76600,
    title: "Avatar: The Way of Water",
    original_language: "en",
    original_title: "Avatar: The Way of Water",
    overview:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    media_type: "movie",
    genre_ids: [878, 12, 28],
    popularity: 2903.334,
    release_date: "2022-12-14",
    video: false,
    vote_average: 7.713,
    vote_count: 4446,
  };

  const trending = async () => {
    const response_movies = await fetch(`${MOVIES_TRENDING_WEEK_QUERYY}`);
    const response_tv = await fetch(`${TV_TRENDING_WEEK_QUERYY}`);
    const data_movies = await response_movies.json();
    const data_tv = await response_tv.json();

    data_tv.results.map((i) => {
      i.release_date = i.first_air_date;
      i.title = i.name;
    });

    const top5m = data_movies.results.slice(0, 5);
    const top5t = data_tv.results.slice(0, 5);
    const topMoviesTvs = top5m.concat(top5t);

    setMovies(data_movies.results);
    setTv(data_tv.results);
    setTopMoviesTvs(topMoviesTvs);
    // setMainCard(topMoviesTvs[0]);
    // console.log(mainCard);
    // setLoading(false);
  };
  // const topMoviesTvs = movies;

  // console.log(movies[1]);
  useEffect(() => {
    trending();
  }, []);

  // const tts = topMoviesTvs;
  useEffect(() => {
    setTimeout(() => {
      setMainCard(topMoviesTvs[counter]);
      counter < topMoviesTvs.length ? setCounter(counter + 1) : setCounter(0);
    }, 10000);
  });
  // const xddd = topMoviesTvs;
  // let c = 0;
  // const timer = setInterval(() => {
  //   setMainCard(xddd[c]);
  //   // console.log(counter);

  //   c < xddd.length ? (c += 1) : (c = 0);
  // }, 10000);

  // console.log(counter);
  // console.log(tv);
  // console.log(mainCard);

  if (isLoading && mainCard === undefined) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="trendingApp">
      {/* <MainCardHome title={mainCard ? mainCard.title : mov0.title} /> */}
      {/* <button onClick={() => trending()}>REFRESH</button> */}

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
      {/* <MovieCard title={movies[1].title} />
      <img src={POSTER} /> */}
    </div>
  );
}
