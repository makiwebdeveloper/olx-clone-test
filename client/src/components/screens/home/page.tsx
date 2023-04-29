import Layout from "@/components/layout/Layout";
import { Pagination, Search, Sort } from "@/components/ui";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ICategory } from "@/interfaces/category.interface";
import { PostsSortEnum } from "@/services/posts/posts.types";
import { FC, useState } from "react";

const Home: FC<{ categories: ICategory[] }> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortType, setSortType] = useState<PostsSortEnum | null>(null);

  const { currentPage, perPage } = useTypedSelector(
    (state) => state.pagination
  );
  const { setCurrentPage } = useActions();

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
      <div className="flex justify-center my-8">
        <Pagination
          currentPage={currentPage}
          dataLength={100}
          perPage={perPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Layout>
  );
};

export default Home;
