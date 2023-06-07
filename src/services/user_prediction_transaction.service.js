import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";
import { getOne as getUser } from "./user.service.js";
import * as dotenv from "dotenv";
import axios from "axios";
import { bucketImage, deleteImage } from "../utils/bucketImage.utils.js";
import { default as FormData } from "form-data";

dotenv.config();

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

const getByUserId = async (id) => {
  if (await getUser(id)) {
    const data = await query(
      `SELECT * FROM user_prediction_transaction WHERE user_id = ?`,
      [id]
    );
    return data;
  } else throw Error("User not found");
};

const createOne = async (params, file) => {
  let message = "Error in creating user_prediction_transaction data";
  let createdData = null;
  let prediction = null;
  let status = false;

  const imageUrl = await bucketImage(file);
  const formData = new FormData();

  formData.append("image", file.buffer, { filename: file.originalname });

  if (imageUrl) {
    const mlServicePrediction = await axios.post(
      `${process.env.ML_SERVICE_ENDPOINT}/emotion_prediction`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    prediction = mlServicePrediction.data;

    if (prediction.status !== false) {
      console.info(`Successfully predict the emotion for`, { imageUrl });
    } else {
      message = `can't detect your face, try again with another photo`;
      deleteImage(imageUrl);
      return { message: message, data: createdData, status };
    }
  }

  const id = v1();
  const q = `INSERT INTO user_prediction_transaction(id, url_photo, prediction, user_id) VALUES(?, ?, ?, ?)`;
  const result = await query(q, [
    id,
    imageUrl,
    prediction.prediction,
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

export { getAll, getOne, createOne, updateOne, deleteOne, getByUserId };
