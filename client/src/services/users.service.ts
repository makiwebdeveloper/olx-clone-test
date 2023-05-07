import $api from "@/api/api.instance";
import { IUser } from "@/interfaces/user.interface";

const url = "/users";

const UsersService = {
  async toggleFavorite(postId: number) {
    return $api<IUser>({
      url: `${url}/favorites/${postId}`,
      method: "PATCH",
    });
  },
};

export default UsersService;
