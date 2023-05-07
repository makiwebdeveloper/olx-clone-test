import Layout from "@/components/layout/Layout";
import { FC, useEffect, useState } from "react";
import { Loader, Pagination, PostsList, Search, Sort } from "@/components/ui";
import { usePosts } from "@/hooks/queries";
import { useActions, useTypedSelector } from "@/hooks";
import { ICategory } from "@/interfaces/category.interface";
import { PostsSortEnum } from "@/services/posts/posts.types";
import { scroll } from "@/utils/scroll";

const Home: FC<{ categories: ICategory[] }> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortType, setSortType] = useState<PostsSortEnum | null>(null);

  const { currentPage, perPage } = useTypedSelector(
    (state) => state.pagination
  );
  const { setCurrentPage } = useActions();

  const { posts, postsLength, isLoading, refetch, isPreviousData } = usePosts({
    currentPage,
    searchTerm,
    categoryId,
    sortType,
    perPage,
  });

  const refetchHandler = () => {
    setCurrentPage(1);
    refetch();
  };

  useEffect(() => {
    scroll("header");
  }, [currentPage]);

  return (
    <Layout title="Home" description="Olx Clone home page" container>
      <Search
        value={searchTerm}
        setValue={setSearchTerm}
        onClick={refetchHandler}
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
      {isLoading ? (
        <Loader />
      ) : (
        posts &&
        postsLength && (
          <>
            <PostsList posts={posts} />
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                dataLength={postsLength}
                perPage={perPage}
                onPageChange={(page) => setCurrentPage(page)}
                isPreviousData={isPreviousData}
              />
            </div>
          </>
        )
      )}
    </Layout>
  );
};

export default Home;
