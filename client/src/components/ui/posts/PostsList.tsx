import { IPost } from "@/interfaces/post.interface";
import { FC } from "react";
import PostItem from "./PostItem";
import { useFavorites } from "@/hooks/queries";

interface Props {
  posts: IPost[];
}

const PostsList: FC<Props> = ({ posts }) => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-2 my-8">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} favorites={favorites} />
      ))}
    </div>
  );
};

export default PostsList;
