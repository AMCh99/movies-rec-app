import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

//https://api.themoviedb.org/3/search/movie?api_key=f402a4b12e741e93d7e20be5d6f634d6&query=Jack+Reacher

//https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}

const API_KEY = "f402a4b12e741e93d7e20be5d6f634d6";
const API_CODE =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDAyYTRiMTJlNzQxZTkzZDdlMjBiZTVkNmY2MzRkNiIsInN1YiI6IjYzY2M2OTU5Y2VlNDgxMDBkZWU4OWU0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6zgSiWjnA_2frOOKjORgzgAHs3tbYQfd9zGi_rhct5Y";

const EXAMPLE_QUERY1 = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`;

const EXAMPLE_QUERY2 = `
https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Jack+Reacher`;

function App() {
  const searchMovies = async () => {
    const response = await fetch(`${EXAMPLE_QUERY2}`);
    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return <div className="App"></div>;
}

export default App;
