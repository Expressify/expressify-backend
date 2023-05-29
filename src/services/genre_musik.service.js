import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM genre_musik`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM genre_musik WHERE id = ?`, [id]);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating genre_musik data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO genre_musik(id, genre_id, musik_id) VALUES(?, ?, ?)`;
  const result = await query(q, [id, params.genre_id, params.musik_id]);

  if (result.affectedRows) {
    message = "genre_musik successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating genre_musik";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `genre_musik with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE genre_musik SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update genre_musik successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting genre_musik";
  let status = false;

  if (!(await getOne(id))) {
    message = `genre_musik with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM genre_musik WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete genre_musik successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne };
