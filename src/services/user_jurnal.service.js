import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";
import { getOne as getUser } from "./user.service.js";
import axios from "axios";
import * as dotenv from "dotenv";

const getAll = async () => {
  const data = await query(
    `SELECT * FROM user_jurnal ORDER BY created_at DESC`
  );
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM user_jurnal WHERE id = ?`, [id]);
  return data[0];
};

const getByUserId = async (id) => {
  if (await getUser(id)) {
    const data = await query(
      `SELECT * FROM user_jurnal WHERE user_id = ? ORDER BY created_at DESC`,
      [id]
    );
    return data;
  } else throw Error("User not found");
};

const createOne = async (params) => {
  let message = "Error in creating user_jurnal data";
  let createdData = null;
  let status = false;
  let prediction = null;
  let created_date = new Date();

  const mlServicePrediction = await axios.post(
    `${process.env.ML_SERVICE_ENDPOINT}/jurnal_prediction`,
    { text: params.jurnal }
  );

  prediction = mlServicePrediction.data;

  if (prediction.status !== false) {
    console.info(
      `Successfully predict the probability of mental issue for this user`,
      params.user_id
    );
  } else {
    message = `can't detect your jurnal, try again with another jurnal`;
    return { message: message, data: createdData, status };
  }

  const id = v1();
  const q = `INSERT INTO user_jurnal(id, jurnal, prediction, user_id, created_at) VALUES(?, ?, ?, ?, ?)`;
  const result = await query(q, [
    id,
    params.jurnal,
    prediction.prediction,
    params.user_id,
    created_date,
  ]);

  if (result.affectedRows) {
    message = "user_jurnal successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating user_jurnal";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `user_jurnal with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE user_jurnal SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update user_jurnal successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting user_jurnal";
  let status = false;

  if (!(await getOne(id))) {
    message = `user_jurnal with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM user_jurnal WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete user_jurnal successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne, getByUserId };
