import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM buku`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM buku WHERE id = ?`, [id]);
  return data[0];
};

const createOne = async (params) => {
  let message = "Error in creating buku data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO buku(id, judul_buku) VALUES(?, ?)`;
  const result = await query(q, [id, params.judul_buku]);

  if (result.affectedRows) {
    message = "buku successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating buku";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `buku with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE buku SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update buku successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting buku";
  let status = false;

  if (!(await getOne(id))) {
    message = `buku with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM buku WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete buku successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne };
