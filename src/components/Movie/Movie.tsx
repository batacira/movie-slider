import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import styles from "./Movie.module.css";

interface MovieProps {
  image: string;
  genreIndex: number;
  movieIndex: number;
  title: string;
  overview: string;
  vote_average: number;
}

const Movie = ({
  image,
  genreIndex,
  movieIndex,
  title,
  vote_average,
  overview,
}: MovieProps) => {
  const { xAxis, yAxis, setMovieTitle, setMovieAverageVote, setMovieOverview } =
    useAppContext();
  const isMovieSelected = genreIndex === yAxis && movieIndex === xAxis;

  useEffect(() => {
    if (isMovieSelected) {
      setMovieTitle(title);
      setMovieOverview(overview);
      setMovieAverageVote(vote_average);
    }
  }, [isMovieSelected]);

  return (
    <div className={styles.movieWrapper}>
      <div
        className={
          isMovieSelected ? `${styles.movie} ${styles.active}` : styles.movie
        }
      >
        <img src={image} alt="" />
      </div>
      <p className={isMovieSelected ? styles.movieTitle : styles.hide}>
        {title}
      </p>
    </div>
  );
};

export default Movie;
