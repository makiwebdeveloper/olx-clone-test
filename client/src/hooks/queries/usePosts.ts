import PostsService from "@/services/posts/posts.service";
import { PostsSortEnum } from "@/services/posts/posts.types";
import { useQuery } from "@tanstack/react-query";

interface IArguments {
  currentPage?: number;
  searchTerm?: string;
  categoryId?: number | null;
  sortType?: PostsSortEnum | null;
  perPage?: number;
}

export const usePosts = ({
  currentPage,
  searchTerm,
  categoryId,
  sortType,
  perPage,
}: IArguments) => {
  const query = useQuery(
    ["get all posts", currentPage],
    () =>
      PostsService.getAll({
        searchTerm: searchTerm || undefined,
        categoryId: categoryId || undefined,
        sort: sortType || undefined,
        page: currentPage,
        perPage,
      }),
    {
      keepPreviousData: true,
      select: ({ data }) => data,
    }
  );

  const { data, ...restQuery } = query;

  return {
    posts: data?.posts,
    postsLength: data?.length,
    ...restQuery,
  };
};
