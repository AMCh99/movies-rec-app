export default function MovieCard(props) {
  //   const poster_link = "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg";
  //   const poster_link = props.poster_path;
  //   console.log(poster_link);

  //   const POSTER = `https://image.tmdb.org/t/p/w400/${poster_link}`;

  function AddToFav(movie_id) {
    // const fav_movies_length = window.localStorage.getItem(favMovies);
    // window.localStorage.setItem("favMovies", movie_id);

    // status ? setStatus(false) : setStatus(true);
    // window.localStorage.clear();
    // const items = window.localStorage.getItem("favMovies");
    // console.log(items ? "ok" : "nieok");
    if (window.localStorage.getItem("favMovies")) {
      // console.log("jest baza");
      let baza_string = JSON.parse(window.localStorage.getItem("favMovies"));
      // console.log(baza_string);
      const updateBaza = baza_string["mov"];
      if (updateBaza.includes(movie_id)) {
        const index = updateBaza.indexOf(movie_id);
        const updateBaza2 = updateBaza.splice(index, 1);
      } else {
        const updateBaza2 = updateBaza.push(movie_id);
      }

      // console.log(updateBaza);
      // baza.push("pies");
      window.localStorage.removeItem("favMovies");
      window.localStorage.setItem(
        "favMovies",
        JSON.stringify({ mov: updateBaza })
      );
    } else {
      // const moviesObj = { mov: [movie_id] };
      window.localStorage.setItem(
        "favMovies",
        JSON.stringify({ mov: [movie_id] })
      );
      // console.log("robie baze");
    }

    // items ? "ok" : window.localStorage.setItem("favMovies", []);
    // console.log(window.localStorage.getItem("favMovies"));
  }

  return (
    <div className="movieCard">
      <img src={props.poster} alt={props.title} />
      <p className="titleCard">{props.title}</p>
      <button type="button" onClick={() => AddToFav(props.movie_id)}>
        &#10084;
      </button>
      {props.vote_average ? <p>{props.vote_average.toFixed(1)}</p> : <p>N/A</p>}

      {props.release_date ? (
        <p>{props.release_date.toString().slice(0, 4)}</p>
      ) : (
        <p>N/A</p>
      )}
    </div>
  );
}
