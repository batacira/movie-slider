import { useEffect, useState } from "react";
import Genre from "../../components/Genre/Genre";
import Popup from "../../components/Popup/Popup";
import { useAppContext } from "../../context/appContext";
import styles from "./Home.module.css";
import genresJson from "../../Genres.json";

const Home = () => {
  const {
    increaseX,
    decreaseX,
    increaseY,
    decreaseY,
    movieTitle,
    movieOverview,
    movieAverageVote,
    currentMaxLength,
    yAxis,
  } = useAppContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function moveHorizontalOrVertical(e: KeyboardEvent) {
    if (e.key === "ArrowLeft" && !isPopupOpen) {
      e.preventDefault();
      decreaseX();
    } else if (e.key === "ArrowRight" && !isPopupOpen) {
      e.preventDefault();
      increaseX();
    } else if (e.key === "ArrowUp" && !isPopupOpen) {
      e.preventDefault();
      decreaseY();
    } else if (e.key === "ArrowDown" && !isPopupOpen) {
      e.preventDefault();
      increaseY();
    } else if (e.key === "Enter") {
      setIsPopupOpen(true);
    } else if (e.key === "Escape") {
      setIsPopupOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", moveHorizontalOrVertical);
    return () =>
      document.removeEventListener("keydown", moveHorizontalOrVertical);
  }, [isPopupOpen, currentMaxLength, yAxis]);

  return (
    <>
      <div className={styles.home}>
        {genresJson.genres.map((singleGenre, index) => {
          const { name, id } = singleGenre;
          return <Genre key={id} id={id} index={index} name={name} />;
        })}
      </div>
      <Popup
        title={movieTitle}
        overview={movieOverview}
        vote_average={movieAverageVote}
        isPopupOpen={isPopupOpen}
      />
    </>
  );
};

export default Home;
