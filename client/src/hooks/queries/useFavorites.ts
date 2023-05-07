import FavoritesService from "@/services/favorites.service";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../useAuth";

export const useFavorites = () => {
  const { user } = useAuth();

  const query = useQuery(
    ["get favorites"],
    () => FavoritesService.getFavorites(),
    {
      enabled: user ? true : false,
    }
  );

  const { data, ...restQuery } = query;

  return {
    favorites: query.data,
    ...restQuery,
  };
};
