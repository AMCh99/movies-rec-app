export default function MovieCard(props) {
  function AddToFav([movie_id, media_type, title, id]) {
    if (window.localStorage.getItem("favMovies")) {
      let baza_string = JSON.parse(window.localStorage.getItem("favMovies"));
      var updateBaza = baza_string["mov"];
      var id = updateBaza.length;
      if (updateBaza.includes([movie_id, media_type, title, id])) {
        const index = updateBaza.indexOf([movie_id, media_type, title, id]);
        updateBaza.splice(index, 1);

        window.localStorage.removeItem("favMovies");
        window.localStorage.setItem(
          "favMovies",
          JSON.stringify({ mov: updateBaza })
        );
      } else {
        updateBaza.push([movie_id, media_type, title, id]);

        window.localStorage.removeItem("favMovies");
        window.localStorage.setItem(
          "favMovies",
          JSON.stringify({ mov: updateBaza })
        );
      }
    } else {
      window.localStorage.setItem(
        "favMovies",
        JSON.stringify({ mov: [[movie_id, media_type, title, 0]] })
      );
    }
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
