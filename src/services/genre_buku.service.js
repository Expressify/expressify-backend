import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM genre_buku`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM genre_buku WHERE id = ?`, [id]);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating genre_buku data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO genre_buku(id, genre_id, buku_id) VALUES(?, ?, ?)`;
  const result = await query(q, [id, params.genre_id, params.buku_id]);

  if (result.affectedRows) {
    message = "genre_buku successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating genre_buku";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `genre_buku with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE genre_buku SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update genre_buku successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting genre_buku";
  let status = false;

  if (!(await getOne(id))) {
    message = `genre_buku with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM genre_buku WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete genre_buku successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne };
