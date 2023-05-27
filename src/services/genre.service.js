import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM genre`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM genre WHERE id = ?`, [id]);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating user data";
  let createdData = null;
  const id = v1();
  const q = `INSERT INTO genre(id, nama_genre, jenis_genre) VALUES(?, ?, ?)`;
  const result = await query(q, [id, params.nama_genre, params.jenis_genre]);

  if (result.affectedRows) {
    message = "Genre successfully created genre";
    createdData = await getOne(id);
  }

  return { message: message, data: createdData };
};

const updateOne = async (req) => {
  let message = "Error in updating genre";
  let updatedData = null;

  if (!(await getOne(req.params.id))) {
    message = `genre with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE genre SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update genre successful";
    updatedData = await getOne(req.params.id);
  }

  return { message, data: updatedData };
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

export { getAll, getOne, createOne, updateOne, deleteOne };
