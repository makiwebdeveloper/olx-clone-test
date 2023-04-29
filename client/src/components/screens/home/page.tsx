import Layout from "@/components/layout/Layout";
import { Search, Sort } from "@/components/ui";
import { ICategory } from "@/interfaces/category.interface";
import { PostsSortEnum } from "@/services/posts/posts.types";
import { FC, useState } from "react";

const Home: FC<{ categories: ICategory[] }> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortType, setSortType] = useState<PostsSortEnum | null>(null);

  console.table({ searchTerm, categoryId, sortType });

  return (
    <Layout title="Home" description="Olx Clone home page" container>
      <Search
        value={searchTerm}
        setValue={setSearchTerm}
        onClick={() => {}}
        restStyles="pt-8"
      />
      <Sort
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        sortType={sortType}
        setSortType={setSortType}
        categories={categories}
        restStyles="pt-8"
      />
    </Layout>
  );
};

export default Home;
