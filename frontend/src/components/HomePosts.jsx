/* eslint-disable react/prop-types */

import { IF } from "../utils/urls";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex pt-8 space-x-16">
      <div className="flex flex-col sm:w-[65%]">
        <h1 className="text-gray-50 text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p className="font-mono">@{post.username}</p>
          <div className="flex space-x-2 text-xs font-mono">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-md text-gray-300">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
        <div className="flex justify-start items-center py-5">
          {post.categories?.map((c, index) => (
            <p key={index} className="text-gray-400 text-xs px-2">
              #{c}
            </p>
          ))}
        </div>
      </div>
      <div className="w-[35%] sm:h-[200px] justify-center items-center hidden sm:flex">
        <img
          src={IF + post.photo}
          alt=""
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default HomePosts;
