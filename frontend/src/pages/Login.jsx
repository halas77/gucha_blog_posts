import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../utils/urls";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // console.log(res.data);
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold font-mono text-white">
          <Link to="/">Gucha Blogs</Link>
        </h1>
        <h3 className="text-white font-serif text-lg">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="bg-gray-900 w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[35%] p-10 bg-gray-800 rounded-3xl">
          <h1 className="text-xl font-bold text-left font-serif text-gray-200">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 outline-0 rounded-lg"
            type="email"
            required
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 outline-0 rounded-lg"
            type="password"
            required
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-serif text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ease-in-out duration-300"
          >
            Log in
          </button>
          {error && (
            <h3 className="text-red-500 text-sm ">Wrong Credentials</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p className="text-gray-300">New here?</p>
            <p className="text-gray-50 hover:text-gray-300">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
