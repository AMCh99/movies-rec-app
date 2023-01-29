import "../CSS/MovieTvDesc.css";

export default function MovieTvDesc(props) {
  return (
    <div className="movieTvDesc">
      <img src={props.backdrop_path} alt={props.title} className="backdrop" />
      <div className="desc">
        <img src={props.poster} alt={props.title} />
        <div className="titleDesc">
          <p className="titleCard">{props.title}</p>
          <p className="description">{props.overview}</p>
          <p></p>
          <p>
            &#9733;{props.vote_average.toFixed(1)}/10
            {props.release_date
              ? " " + props.release_date.toString().slice(0, 4)
              : " "}
          </p>
        </div>
      </div>
    </div>
  );
}
