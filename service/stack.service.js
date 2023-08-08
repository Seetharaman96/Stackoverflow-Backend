import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function getUsers() {
  return await client
    .db("Stackoverflow")
    .collection("Stack")
    .find({})
    .toArray();
}
export async function postAnswer(id, result) {
  return await client
    .db("Stackoverflow")
    .collection("Stack")
    .updateOne({ _id: new ObjectId(id) }, { $set: result });
}
export async function updateViews(id, result) {
  await client
    .db("Stackoverflow")
    .collection("Stack")
    .updateOne({ _id: new ObjectId(id) }, { $set: result });
}
export async function getById(id) {
  return await client
    .db("Stackoverflow")
    .collection("Stack")
    .findOne({ _id: new ObjectId(id) });
}
export async function createQn(data) {
  return await client
    .db("Stackoverflow")
    .collection("Stack")
    .insertOne(data);
}
export async function getAllQuestions() {
  return await client
    .db("Stackoverflow")
    .collection("Stack")
    .find({})
    .toArray();
}
export async function getQuestions() {
  return await client
    .db("Stackoverflow")
    .collection("Stack")
    .find({})
    .toArray();
}
