/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../utils/urls";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
      // console.log(title);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        // console.log(imgUpload.data)
      } catch (err) {
        console.log(err);
      }
    }
    //post upload

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
    console.log("working here");
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] pt-8 bg-gray-900">
        <h1 className="text-xl text-white font-serif ">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4 bg-gray-800 p-10 rounded-3xl">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-4 outline-none bg-gray-900 rounded-lg text-sm text-white font-serif"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 bg-gray-900 text-white py-4 text-sm rounded-lg"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-6">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 utline-none bg-gray-900 text-white py-4 text-sm rounded-lg font-serif"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-gray-900 text-white cursor-pointer rounded-full w-11 h-11 flex justify-center text-3xl mx-auto"
              >
                +
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-700 px-2 py-1 rounded-md text-white font-serif"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1"
                  >
                    <ImCross size={8} />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="px-6 outline-none bg-gray-900 text-white py-5 text-sm rounded-lg font-serif"
            placeholder="Enter post description"
          />
          <button
            onClick={handleUpdate}
            className="bg-gray-900 w-full md:w-[15%] mx-auto text-white  px-2 py-2 text-lg rounded-3xl border-gray-500 border font-serif"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
