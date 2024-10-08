import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const register = (req, res) => {
  // CHECK IF USER EXIST,

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length) {
      return res.status(400).json("User already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?, ?, ?, ?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json("user has been created");
    });
  });

  // IF NOT CREATE USER

  // hash password
};

// export const register = (req, res) => {
//   res.json({ message: "you have succeeded" });
// };

export const login = (req, res) => {
  // if no user send error

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("User does not exists");
    }

    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkedPassword) {
      return res.status(400).json("Wrong username or password");
    }

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);

    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });

  // if user then we login
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
