import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import stackRouter from "./router/stack.router.js";
import usersRouter from "./router/users.router.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4000;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is Connected");

app.use(express.json());
app.use(cors());

const data = [
  {
    userName: "Seetha",
    topic: "Javascript",
    description: "What is Javascript",
    views: 0,
    answer: [
      {
        userNameAnswer: "Aadhira",
        answer: "Javascript is a dynamic computer programming language",
      },
      {
        userNameAnswer: "Dhanam",
        answer: "Javascript is used for creating dynamic web page content",
      },
    ],
  },
  {
    userName: "Raghu",
    topic: "ReactJS",
    description: "What is ReactJS",
    views: 0,
    answer: [
      {
        userNameAnswer: "Aadhira",
        answer: "ReactJS is the open-source front-end javascript library",
      },
      {
        userNameAnswer: "Dhanam",
        answer: "ReactJs can be used to develop Single page applications",
      },
    ],
  },
];

// app.get("/", async function(req,res){
//   res.send(data)
// })

// app.post("/create", async function (req, res) {
//   const data = req.body;
//   const result = await client
//     .db("Stackoverflow")
//     .collection("Stack")
//     .insertMany(data);
//   res.send(result);
// });

app.use("/", stackRouter);

app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server Started in ${PORT}`));
