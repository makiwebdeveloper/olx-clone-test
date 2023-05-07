import $api from "@/api/api.instance";
import { IPost } from "@/interfaces/post.interface";

const path = "/favorites";

const FavoritesService = {
  async getFavorites() {
    const response = await $api<IPost[]>({
      url: path,
      method: "GET",
    });

    return response.data;
  },

  async toggleFavorite(postId: number | string) {
    const response = await $api<IPost[]>({
      url: `${path}/${postId}`,
      method: "PUT",
    });

    return response.data;
  },
};

export default FavoritesService;
