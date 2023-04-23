import $api from "@/api/api.instance";
import { ICategory } from "@/interfaces/category.interface";

const path = "/categories";

const CategoriesService = {
  async getAll() {
    return $api<ICategory[]>({
      url: path,
      method: "GET",
    });
  },

  async getByid(id: string | number) {
    return $api<ICategory[]>({
      url: `${path}/${id}`,
      method: "GET",
    });
  },

  async create(name: string) {
    return $api<ICategory>({
      url: path,
      method: "POST",
      data: { name },
    });
  },

  async update(id: string | number, name: string) {
    return $api<ICategory>({
      url: `${path}/${id}`,
      method: "PUT",
      data: { name },
    });
  },

  async delete(id: string | number) {
    return $api<ICategory>({
      url: `${path}/${id}`,
      method: "DELETE",
    });
  },
};

export default CategoriesService;
