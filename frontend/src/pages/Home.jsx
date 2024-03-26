import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL } from "../utils/urls";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader"
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const {user}=useContext(UserContext)


  const { search } = useLocation();

  const fetchData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      // console.log(res.data);
      setPosts(res.data);

      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  console.log(user);
  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-6 lg:px-[200px] md:px-24 min-h-[80vh] bg-gray-900">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <>
          <img className="rounded-[100px] mx-auto p-5 lg:w-[600px]" src="/no_data.gif" alt="" />
          <h3 className="text-center mt-16 text-white font-serif">No Posts Available</h3>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
