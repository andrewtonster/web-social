import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const host = import.meta.env.VITE_HOST;

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  // destructoring, getting all the sam previous values, but only the target
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // goign to prevent default so no refresh
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // emit a post requiest

      await axios.post(`${host}/api/auth/register`, inputs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            maiores, placeat dicta voluptates omnis modi magni earum recusandae
            consequatur ipsum provident nulla. Fugiat, aut. Cum libero minus et
            consectetur! Laudantium!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
