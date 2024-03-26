import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/urls";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3),
  desc: z.string().min(20),
});

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  // each catagories
  const [cat, setCat] = useState("");

  // list of catagories
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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
  };

  const handleCreate = async (e) => {
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
        await axios.post(URL + "/api/upload", data);
        // console.log(imgUpload.data)
      } catch (err) {
        console.log(err);
      }
    }
    //post upload
    console.log(post);
    try {
      // validate post before sending request
      createPostSchema.parse({ title, desc });

      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      setError(false);
      navigate("/posts/post/" + res.data._id);
      // console.log(res.data);
    } catch (err) {
      setError(true);
      // console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="px-6 md:px-[200px] pt-8 bg-gray-900">
          <h1 className="text-xl text-white font-serif">Create post</h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-6 mt-4 bg-gray-800 p-10 rounded-3xl">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="px-4 py-4 bg-gray-900 rounded-lg text-sm text-white font-serif"
            />
            <div className="space-y-2 w-full">
              <p className="text-gray-300 font-serif">Image:</p>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                className="px-4 bg-gray-900 text-white py-4 text-sm rounded-lg"
                placeholder="Insert image"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-6">
                <input
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="px-4  bg-gray-900 text-white py-4 text-sm rounded-lg font-serif"
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
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-600 px-2 py-1 rounded-md text-white font-serif"
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
              rows={15}
              cols={15}
              className="px-6 bg-gray-900 text-white py-5 text-sm rounded-lg font-serif"
              placeholder="Enter post description"
            />
            {error && (
              <h3 className="text-red-500 text-xs">
                <p>Title must have at least 3 character.</p>
                <p>Description must have at least 20 character.</p>
                <p>Each catagories must have at least 2 character.</p>
              </h3>
            )}
            <button
              onClick={handleCreate}
              className="bg-gray-900 w-full md:w-[15%] mx-auto text-white  px-2 py-2 text-lg rounded-3xl border-gray-500 border font-serif"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
