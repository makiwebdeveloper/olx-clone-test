import $api from "@/api/api.instance";
import { DataFiltersType, DataType } from "./posts.types";
import { IPost } from "@/interfaces/post.interface";

const url = "/posts";

const PostsService = {
  async getAll(queryData: DataFiltersType = {}) {
    return $api<{ posts: IPost[]; length: number }>({
      url: `${url}`,
      method: "GET",
      params: queryData,
    });
  },

  async getById(id: string | number) {
    return $api<IPost>({
      url: `${url}/${id}`,
      method: "GET",
    });
  },

  async create(data: DataType) {
    return $api<IPost>({
      url,
      method: "POST",
      data,
    });
  },

  async update(postId: string | number, data: DataType) {
    return $api<IPost>({
      url: `${url}/${postId}`,
      method: "PUT",
      data,
    });
  },

  async delete(postId: string | number) {
    return $api<IPost>({
      url: `${url}/${postId}`,
      method: "DELETE",
    });
  },
};

export default PostsService;
