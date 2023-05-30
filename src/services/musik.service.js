import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM musik`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM musik WHERE id = ?`, [id]);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating musik data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO musik(id, judul_musik, url_spotify) VALUES(?, ?, ?)`;
  const result = await query(q, [id, params.judul_musik, params.url_spotify]);

  if (result.affectedRows) {
    message = "musik successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating musik";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `musik with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE musik SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update musik successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting musik";
  let status = false;

  if (!(await getOne(id))) {
    message = `musik with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM musik WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete musik successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne };
