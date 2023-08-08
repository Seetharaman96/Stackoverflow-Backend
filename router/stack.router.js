import express from "express";
import {
  getQuestions,
  getAllQuestions,
  createQn,
  getById,
  updateViews,
  postAnswer,
  getUsers,
} from "../service/stack.service.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

// to get questions
router.get("/", async function (req, res) {
  const result = await getQuestions();
  res.send(result);
});

// to get question , description
router.get("/questions", auth, async function (req, res) {
  const result = await getAllQuestions();
  res.send(result);
});

// to post a question
router.post("/createQn", auth, async function (req, res) {
  const data = req.body;
  const result = await createQn(data);
  res.send(result);
});

// to get by id
router.get("/answer/:id", auth, async function (req, res) {
  const { id } = req.params;
  const result = await getById(id);
  if (result) {
    result.views = result.views + 1;
    await updateViews(id, result);
    res.send(result);
  }
});

// to post answer
router.put("/answer/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const result = await getById(id);
  result.answer.push(data);
  const final = await postAnswer(id, result);
  res.send(final);
});

// to get users
router.get("/users", auth, async function (req, res) {
  const result = await getUsers();
  res.send(result);
});

// to update votes
// router.put("/answer/:id", async function (req, res) {
//   const { id } = req.params;
//   const result = await client
//     .db("Stackoverflow")
//     .collection("User")
//     .findOne({ _id: new ObjectId(id) });
//   result.votes = result.votes + 1;
//   const final = await client
//     .db("Stackoverflow")
//     .collection("User")
//     .updateOne({ _id: new ObjectId(id) }, { $set: result });
//   res.send(final);
// });

// router.put("/edit/:id", async function (req, res) {
//   const { id } = req.params;
//   const data = req.body;
//   const result = await client
//     .db("Stackoverflow")
//     .collection("User")
//     .updateOne({ _id: new ObjectId(id) }, { $set: data });
//   res.send(result);
// });

// router.delete("/delete/:id", async function (req, res) {
//   const { id } = req.params;
//   const result = await client
//     .db("Stackoverflow")
//     .collection("User")
//     .deleteOne({ _id: new ObjectId(id) });
//   res.send(result);
// });

export default router;
