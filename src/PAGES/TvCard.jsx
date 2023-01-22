export default function TvCard(props) {
  //   const poster_link = "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg";
  //   const poster_link = props.poster_path;
  //   console.log(poster_link);

  //   const POSTER = `https://image.tmdb.org/t/p/w400/${poster_link}`;

  return (
    <div className="tvCard">
      <img src={props.poster} alt={props.title} />
      <p className="titleCard">{props.title}</p>
      <p>Scoring: {props.vote_average.toFixed(1)}</p>
      <p>{props.first_air_date.toString().slice(0, 4)}</p>
    </div>
  );
}
