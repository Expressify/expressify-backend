import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM user_prediction_transaction`);
  return data;
};

const getOne = async (id) => {
  const data = await query(
    `SELECT * FROM user_prediction_transaction WHERE id = ?`,
    [id]
  );
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating user_prediction_transaction data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO user_prediction_transaction(id, url_photo, prediction, user_id) VALUES(?, ?, ?, ?)`;
  const result = await query(q, [
    id,
    params.url_photo,
    params.prediction,
    params.user_id,
  ]);

  if (result.affectedRows) {
    message = "user_prediction_transaction successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating user_prediction_transaction";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `user_prediction_transaction with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE user_prediction_transaction SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update user_prediction_transaction successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting user_prediction_transaction";
  let status = false;

  if (!(await getOne(id))) {
    message = `user_prediction_transaction with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM user_prediction_transaction WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete user_prediction_transaction successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne };
