import { useAuth } from "@/hooks";
import { IPost } from "@/interfaces/post.interface";
import FavoritesService from "@/services/favorites.service";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { queryClient } from "../../../../pages/_app";

interface Props {
  post: IPost;
  favorites?: IPost[];
}

const PostItem: FC<Props> = ({ post, favorites }) => {
  const { user } = useAuth();
  const isFavorite = favorites?.some((fv) => fv.id === post.id);

  const { mutate: toggleFavorite } = useMutation(
    (postId: number) => FavoritesService.toggleFavorite(postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get favorites"]);
      },
    }
  );

  return (
    <div className="flex flex-col sm:flex-row items-start bg-white rounded-lg">
      <div className="relative w-full h-[180px] sm:w-[150px] sm:h-[130px]">
        <Image
          fill
          sizes="180px"
          src={`${process.env.SERVER_URL}/uploads/${post.images[0]}`}
          alt="image"
          className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
        />
      </div>
      <div className="flex w-full sm:w-auto sm:flex-1">
        <div className="flex-1 px-4 py-3">
          <h2 className="w-[220px] md:w-[400px] lg:w-[600px] truncate text-2xl">
            {post.title}
          </h2>
          <p className="">${post.price}</p>
        </div>
        {user && (
          <button className="m-3" onClick={() => toggleFavorite(post.id)}>
            <AiFillHeart
              className={`w-7 h-7 sm:w-6 sm:h-6 ${
                isFavorite ? "text-red-400" : "text-gray-300"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
