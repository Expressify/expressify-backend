import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM article`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM article WHERE id = ?`, [id]);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating article data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO article(id, content, url_photo) VALUES(?, ?, ?)`;
  const result = await query(q, [id, params.content, params.url_photo]);

  if (result.affectedRows) {
    message = "article successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating article";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `article with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE article SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update article successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting article";
  let status = false;

  if (!(await getOne(id))) {
    message = `article with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM article WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete article successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne };
