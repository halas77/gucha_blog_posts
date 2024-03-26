import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // console.log(user);
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="bg-gray-900 flex items-center justify-between px-6 lg:px-[200px] md:px-24 py-4 border-b border-gray-700">
      <h1 className="text-xl font-bold font-mono text-white">
        <Link to="/"> Gucha Blogs</Link>
      </h1>
      <div className="hidden lg:flex justify-center items-center space-x-0">
        <input
          onChange={(e) => setPrompt(e.target.value)}
          className="outline-none px-16 py-3 rounded-full bg-gray-900 font-serif text-white border border-gray-600"
          placeholder="Search for posts"
          type="text"
        />
        <p
          onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
          className="cursor-pointer"
        >
          <BsSearch className="text-white text-lg ml-3 " />
        </p>
      </div>

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 text-white">
        {user ? (
          <h3 className="px-6 py-1 rounded-full bg-gray-800 border border-gray-400 hover:text-gray-400">
            <Link to="/write">New Post</Link>
          </h3>
        ) : (
          <h3 className="hover:text-gray-400">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaUserCircle size={28} />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3 className="hover:text-gray-400">
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-white">
        <p className="cursor-pointer relative">
          <FaBars size={23}/>
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
