import Movie from "../Movie/Movie";
import styles from "./Genre.module.css";
import { useGenreQuery } from "./api/getGenres";
import { useAppContext } from "../../context/appContext";
import { useEffect, useRef, useState } from "react";

interface GenreProps {
  index: number;
  id: number;
  name: string;
}

interface SingleMovieProps {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

const Genre = ({ index, name, id }: GenreProps) => {
  const { data, isLoading, isError } = useGenreQuery(name, id);
  const { xAxis, yAxis, changeX, changeXIndex, xIndex, setCurrentMaxLength } =
    useAppContext();
  const [currentXTranslate, setCurrentXTranslate] = useState(0);
  const [firstVisible, setFirstVisible] = useState(0);
  const [lastVisible, setLastVisible] = useState(5);
  const genreContainer = useRef<HTMLDivElement>(null);
  const oneMovieWidth = 16.4;

  useEffect(() => {
    if (yAxis === index) {
      setCurrentMaxLength(data?.data.results.length);
      genreContainer?.current?.scrollIntoView({ behavior: "auto" });
      if (firstVisible + xIndex <= lastVisible) {
        changeX(firstVisible + xIndex);
      } else {
        changeX(lastVisible);
      }
    }
  }, [yAxis, data]);

  useEffect(() => {
    if (yAxis === index) {
      if (xAxis > lastVisible) {
        setLastVisible((prev) => prev + 1);
        setFirstVisible((prev) => prev + 1);
        const pixelsToTranslateBy = -(xAxis + 1 - 6) * oneMovieWidth;
        setCurrentXTranslate(pixelsToTranslateBy);
      } else if (xAxis < firstVisible) {
        setLastVisible((prev) => prev - 1);
        setFirstVisible((prev) => prev - 1);
        const pixelsToTranslateBy = currentXTranslate + oneMovieWidth;
        setCurrentXTranslate(pixelsToTranslateBy);
      }
      changeXIndex(xAxis - firstVisible);
    }
  }, [xAxis, firstVisible, lastVisible]);

  if (isLoading) {
    return <h3 className={styles.genreLoading}>Loading...</h3>;
  }

  if (isError) {
    return <h3 className={styles.genreError}>Error</h3>;
  }

  return (
    <div className={styles.genre} ref={genreContainer}>
      <h3 className={styles.genreTitle}>{name}</h3>
      <div
        className={styles.genreInner}
        style={{ transform: `translateX(${currentXTranslate}vw)` }}
      >
        {data &&
          data.data.results.map(
            (singleMovie: SingleMovieProps, movieIndex: number) => {
              const { poster_path, id, title, overview, vote_average } =
                singleMovie;
              return (
                <Movie
                  key={id}
                  image={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  genreIndex={index}
                  movieIndex={movieIndex}
                  title={title}
                  overview={overview}
                  vote_average={vote_average}
                />
              );
            }
          )}
      </div>
    </div>
  );
};

export default Genre;
