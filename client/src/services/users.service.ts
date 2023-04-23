import $api from "@/api/api.instance";
import { IUser } from "@/interfaces/user.interface";

const url = "/users";

export const UsersService = {
  async toggleFavorite(postId: number) {
    return $api<IUser>({
      url: `${url}/favorites/${postId}`,
      method: "PATCH",
    });
  },
};
