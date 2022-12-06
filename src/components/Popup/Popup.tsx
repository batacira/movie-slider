import { createPortal } from "react-dom";
import styles from "./Popup.module.css";

interface PopupProps {
  title: string;
  overview: string;
  vote_average: number;
  isPopupOpen: boolean;
}

export default function Popup({
  title,
  overview,
  vote_average,
  isPopupOpen,
}: PopupProps) {
  return createPortal(
    <div
      className={
        isPopupOpen ? `${styles.overlay} ${styles.opened}` : styles.overlay
      }
    >
      <div className={styles.popup}>
        <h3>{title}</h3>
        <p>{overview}</p>
        <p>
          <span>Average vote:</span> {vote_average}
        </p>
      </div>
    </div>,
    document.getElementById("popup") as HTMLElement
  );
}
