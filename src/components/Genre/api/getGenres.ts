import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function getGenres(id: number) {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
  );
}

export function useGenreQuery(name: string, id: number) {
  return useQuery([name], () => getGenres(id));
}
