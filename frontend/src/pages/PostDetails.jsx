import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IF, URL } from "../utils/urls";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      console.log(res.data);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);

      console.log(err);
    }
  };

  const handleDeletePost=async ()=>{

    try{
      const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      console.log(res.data)
      navigate("/")

    }
    catch(err){
      console.log(err)
    }

  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full bg-gray-900">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] pt-8 bg-gray-900">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold md:text-3xl text-gray-50">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-5">
                <p
                  className="cursor-pointer text-gray-200"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit size={23}/>
                </p>
                <p className="cursor-pointer text-gray-200" onClick={handleDeletePost}>
                  <MdDelete size={23}/>
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p className="font-mono text-gray-400 ">@{post.username}</p>
            <div className="flex space-x-2 font-mono text-gray-400">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IF + post.photo} className="w-full mx-auto mt-8 lg:h-[450px]" alt="" />

          <p className="mx-auto mt-8 text-gray-300">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p className="text-white">Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, index) => (
                <>
                  <div key={index} className="bg-gray-800 rounded-lg px-3 py-1 text-gray-200">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4"></div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
