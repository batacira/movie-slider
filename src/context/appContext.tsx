import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import genresJson from "../Genres.json";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "../firebase";

const AppContext = createContext({
  xAxis: 0,
  yAxis: 0,
  xIndex: 0,
  movieTitle: "",
  movieOverview: "",
  movieAverageVote: 0,
  currentMaxLength: 0,
  setCurrentMaxLength: (_num: number) => {},
  setMovieTitle: (_str: string) => {},
  setMovieOverview: (_str: string) => {},
  setMovieAverageVote: (_num: number) => {},
  increaseX: () => {},
  decreaseX: () => {},
  increaseY: () => {},
  decreaseY: () => {},
  changeX: (_num: number) => {},
  changeXIndex: (_num: number) => {},
  signIn: (_email: string, _password: string) => {},
  user: null as unknown,
});

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const [xIndex, setXIndex] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieOverview, setMovieOverview] = useState("");
  const [movieAverageVote, setMovieAverageVote] = useState(0);
  const [currentMaxLength, setCurrentMaxLength] = useState(0);
  const [user, setUser] = useState<User | null | {}>(null);

  function increaseX() {
    setXAxis((prev) => {
      if (prev === currentMaxLength - 1) return prev;
      return prev + 1;
    });
  }

  function decreaseX() {
    setXAxis((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  }

  function increaseY() {
    setYAxis((prev) => {
      if (prev === genresJson.genres.length - 1) return prev;
      return prev + 1;
    });
  }

  function decreaseY() {
    setYAxis((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  }

  function changeX(num: number) {
    setXAxis(num);
  }

  function changeXIndex(num: number) {
    setXIndex(num);
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        xAxis,
        yAxis,
        xIndex,
        increaseX,
        decreaseX,
        increaseY,
        decreaseY,
        changeX,
        changeXIndex,
        movieTitle,
        movieOverview,
        movieAverageVote,
        setMovieTitle,
        setMovieOverview,
        setMovieAverageVote,
        currentMaxLength,
        setCurrentMaxLength,
        signIn,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
