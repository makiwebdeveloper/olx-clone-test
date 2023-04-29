import { ICategory } from "@/interfaces/category.interface";
import { PostsSortEnum } from "@/services/posts/posts.types";
import { FC } from "react";

interface Props {
  categoryId: number | null;
  setCategoryId: (categoryId: number | null) => void;
  sortType: PostsSortEnum | null;
  setSortType: (sortType: PostsSortEnum | null) => void;
  categories: ICategory[];
  restStyles?: string;
  col?: boolean;
}

const sorts = [
  { name: "high-price", title: "Найдорожчі" },
  { name: "low-price", title: "Найдешевші" },
  { name: "newest", title: "Найновіші" },
  { name: "oldest", title: "Найстаріші" },
];

const Sort: FC<Props> = ({
  categoryId,
  setCategoryId,
  sortType,
  setSortType,
  categories,
  restStyles,
  col,
}) => {
  return (
    <div
      className={`flex flex-col gap-4 ${
        col ? "" : "sm:flex-row  sm:gap-10"
      }  ${restStyles}`}
    >
      <div className="flex items-center gap-3">
        <p className="text-lg">За категорією:</p>
        <select
          value={categoryId || ""}
          onChange={(e) => setCategoryId(+e.target.value || null)}
          className="px-4 py-2 rounded outline-none"
        >
          <option value="">Всі</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-lg">Сортувати за:</p>
        <select
          value={sortType || ""}
          onChange={(e) =>
            setSortType((e.target.value as PostsSortEnum) || null)
          }
          className="px-4 py-2 rounded outline-none"
        >
          <option value="">Всі</option>
          {sorts.map((item) => (
            <option key={item.name} value={item.name}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sort;
