import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByName, createUser } from "../service/users.service.js";

// to hash password
const generateHashedPassword = async (password) => {
  const noOfRounds = 10;
  const salting = await bcrypt.genSalt(noOfRounds);
  const hashedPassword = await bcrypt.hash(password, salting);
  console.log(hashedPassword);
  return hashedPassword;
};

// signup
router.post("/signup", async function (req, res) {
  const { userName, password } = req.body;
  const userFromDb = await getUserByName(userName);
  if (userFromDb) {
    res.status(400).send({ message: "Email already exists" });
  } else if (password.length < 8) {
    res
      .status(400)
      .send({ message: "Password should be more than 8 characters" });
  } else {
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUser({
      userName: userName,
      password: hashedPassword,
    });
    res.send(result);
  }
});

// login
router.post("/login", async function (req, res) {
  const { userName, password } = req.body;
  const userFromDb = await getUserByName(userName);
  if (!userFromDb) {
    res.status(401).send({ message: "Invalid credentials" });
  } else {
    const storedDbPassword = userFromDb.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDbPassword);
    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDb._id }, process.env.SECRET_KEY);
      res.send({ message: "Login successful", token: token });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  }
});

export default router;
