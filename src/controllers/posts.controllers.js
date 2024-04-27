import { pool } from "../config.js";

export const posts = async (req, res) => {
  const { posts } = req.body;
  const datetime = new Date();
  const iduser = req.user;

  const [insertPost] = await pool.query("INSERT INTO posts SET ?", {
    iduser,
    text: posts,
    datetime,
  });

  if (insertPost.insertId > 0) {
    res.json({
      iduser,
      posts,
      datetime,
    });
  } else {
    res.status(400).json({ message: "ERR_POST" });
  }
};
