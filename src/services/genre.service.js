import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";
import { getOne as getUser } from "./user.service.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM genre`);
  const music_genre = data.filter((data) => data.jenis_genre === 1);
  const book_genre = data.filter((data) => data.jenis_genre === 2);
  const film_genre = data.filter((data) => data.jenis_genre === 3);

  return { music: music_genre, book: book_genre, film: film_genre };
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM genre WHERE id = ?`, [id]);
  return data[0];
};

const getByUserId = async (id) => {
  if (await getUser(id)) {
    const data = await query(
      `SELECT user_genre.id, nama_genre, jenis_genre, nama as nama_user FROM user_genre INNER JOIN genre ON genre.id = genre_id INNER JOIN user ON user.id = user_id WHERE user_id = ?`,
      [id]
    );
    return data;
  } else throw Error(`User not found`);
};

const createOne = async (params) => {
  let message = "Error in creating user data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO genre(id, nama_genre, jenis_genre) VALUES(?, ?, ?)`;
  const result = await query(q, [id, params.nama_genre, params.jenis_genre]);

  if (result.affectedRows) {
    message = "Genre successfully created genre";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating genre";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `genre with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE genre SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update genre successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting genre";
  let status = false;

  if (!(await getOne(id))) {
    message = `genre with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM genre WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete genre successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne, getByUserId };
