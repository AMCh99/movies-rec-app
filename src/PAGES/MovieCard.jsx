export default function MovieCard(props) {
  //   const poster_link = "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg";
  //   const poster_link = props.poster_path;
  //   console.log(poster_link);

  //   const POSTER = `https://image.tmdb.org/t/p/w400/${poster_link}`;

  //Use this instead of FIND BY ID https://developers.themoviedb.org/3/movies/get-movie-details
  const QUERY = `https://api.themoviedb.org/3/find/{external_id}?api_key=<<api_key>>&language=en-US&external_source=imdb_id`;
  //EXAMPLE WORKING QUERY https://api.themoviedb.org/3/movie/12?api_key=f402a4b12e741e93d7e20be5d6f634d6&language=en-US
  //Maybe u can even use this in movie card, but maybe

  function AddToFav([movie_id, media_type, title, id]) {
    // const fav_movies_length = window.localStorage.getItem(favMovies);
    // window.localStorage.setItem("favMovies", movie_id);

    // status ? setStatus(false) : setStatus(true);
    // window.localStorage.clear();
    // const items = window.localStorage.getItem("favMovies");
    // console.log(items ? "ok" : "nieok");

    if (window.localStorage.getItem("favMovies")) {
      console.log("jest baza");
      let baza_string = JSON.parse(window.localStorage.getItem("favMovies"));
      // console.log(baza_string);
      var updateBaza = baza_string["mov"];
      var id = updateBaza.length;
      console.log(id);
      if (updateBaza.includes([movie_id, media_type, title, id])) {
        const index = updateBaza.indexOf([movie_id, media_type, title, id]);
        updateBaza.splice(index, 1);
        console.log("ZAWIERA");
        console.log(updateBaza);
        // console.log(updateBaza2);
        window.localStorage.removeItem("favMovies");
        window.localStorage.setItem(
          "favMovies",
          JSON.stringify({ mov: updateBaza })
        );
      } else {
        updateBaza.push([movie_id, media_type, title, id]);
        console.log(updateBaza);
        // console.log(updateBaza2);
        console.log("NIE ZAWIERA");
        window.localStorage.removeItem("favMovies");
        window.localStorage.setItem(
          "favMovies",
          JSON.stringify({ mov: updateBaza })
        );
      }

      // console.log(updateBaza);
      // baza.push("pies");
      // window.localStorage.removeItem("favMovies");
      // window.localStorage.setItem(
      //   "favMovies",
      //   JSON.stringify({ mov: updateBaza })
      // );
    } else {
      // const moviesObj = { mov: [movie_id] };
      window.localStorage.setItem(
        "favMovies",
        JSON.stringify({ mov: [[movie_id, media_type, title, 0]] })
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

      <div className="date-rating">
        {props.vote_average ? (
          <p>
            <span>&#9733;</span>
            {props.vote_average.toFixed(1)}/10
          </p>
        ) : (
          <p>N/A</p>
        )}
        <button
          type="button"
          onClick={() =>
            AddToFav([props.movie_id, props.media_type, props.title])
          }
        >
          <p id="heart-button">&#9829;</p>
        </button>

        {props.release_date ? (
          <p>{props.release_date.toString().slice(0, 4)}</p>
        ) : (
          <p>N/A</p>
        )}
      </div>
    </div>
  );
}
