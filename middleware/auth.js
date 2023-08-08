import jwt from "jsonwebtoken";

export const auth = (req, res, nxt) => {
  try {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.SECRET_KEY);
    nxt();
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};
