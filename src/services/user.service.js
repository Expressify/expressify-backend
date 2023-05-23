import { query } from "../utils/db.utils.js";
import v1 from "uuid";

const getAll = async () => {
  const data = await query(`SELECT * FROM user`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM user WHERE id = ${id}`);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating user data";
  let createdData = null;
  const id = v1();
  const q = `INSERT INTO user(id, nama, password, email, user_profile_photo_id) VALUES(?, ?, ?, ?, ?)`;
  const result = await query(q, [
    id,
    params.nama,
    params.password,
    params.email,
    params.user_profile_photo_id,
  ]);

  if (result.affectedRows) {
    message = "User successfully created";
    createdData = await getOne(id);
  }

  return { message: message, data: createdData };
};

const updateOne = async (params, id) => {
  let message = "Error in updating user";
  let updatedData = null;

  if (!(await getOne(id))) {
    message = `user with id: ${id} not found`;
    return { message, status };
  }

  const q = "UPDATE user SET ? WHERE id = ?";
  const result = await query(q, [params, id]);

  if (result.affectedRows) {
    message = "Update user successfull";
    updatedData = await getOne(id);
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting user";
  let status = false;

  if (!(await getOne(id))) {
    message = `user with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM user WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete user success";
  }

  return { message };
};

export { getAll, getOne };
