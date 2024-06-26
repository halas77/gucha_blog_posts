import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../utils/urls";
import { z } from "zod";

// Define validation schema
const registrationSchema = z.object({
  email: z.string().email().min(6),
  username: z.string().min(3),
  password: z.string().min(6),
});

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // validate inputs before sending request to server 
      registrationSchema.parse({ email, username, password });

      // send request to server 'register' route
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });

      // save data
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      // console.log(res);
      setError(false);

      // push to login
      navigate("/login");
    } catch (error) {
      // console.error("Error:", error);
      setError(true);
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold font-mono text-white">
          <Link to="/">Gucha Blogs</Link>
        </h1>
        <h3 className="text-white font-serif text-lg">
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="bg-gray-900 w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[35%] p-10 bg-gray-800 rounded-3xl">
          <h1 className="text-xl font-bold text-left font-serif text-gray-200">
            Create an account
          </h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-lg"
            type="email"
            required
            placeholder="Enter your email"
            name="email"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 outline-0 rounded-lg"
            type="text"
            required
            placeholder="Enter your username"
            name="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0 rounded-lg"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          {error && (
            <h3 className="text-red-500 text-xs">
              <p>Username must have at least 3 character.</p>
              <p>Password must have at least 6 character.</p>
            </h3>
          )}
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ease-in-out duration-300 font-serif"
          >
            Register
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
