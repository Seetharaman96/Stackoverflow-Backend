import { client } from "../index.js";

export async function createUser(data) {
  return await client.db("Stackoverflow").collection("Users").insertOne(data);
};

export async function getUserByName(userName) {
  return await client
    .db("Stackoverflow")
    .collection("Users")
    .findOne({ userName: userName });
};
