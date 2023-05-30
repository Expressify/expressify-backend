import { v1 } from "uuid";
import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM film`);
  return data;
};

const getOne = async (id) => {
  const data = await query(`SELECT * FROM film WHERE id = ?`, [id]);
  return data[0];
};

const getByGenreId = async (id) => {
  const data = await query(
    `SELECT * FROM genre_film INNER JOIN genre ON genre.id = genre_id INNER JOIN film ON film.id = film_id WHERE genre_id = ?`,
    [id]
  );
  return data;
};

const createOne = async (params) => {
  let message = "Error in creating film data";
  let createdData = null;
  let status = false;

  const id = v1();
  const q = `INSERT INTO film(id, judul_film) VALUES(?, ?)`;
  const result = await query(q, [id, params.judul_film]);

  if (result.affectedRows) {
    message = "film successfully created";
    createdData = await getOne(id);
    status = true;
  }

  return { message: message, data: createdData, status };
};

const updateOne = async (req) => {
  let message = "Error in updating film";
  let updatedData = null;
  let status = false;

  if (!(await getOne(req.params.id))) {
    message = `film with id: ${req.params.id} not found`;
    return message;
  }

  const q = "UPDATE film SET ? WHERE id = ?";
  const result = await query(q, [req.body, req.params.id]);

  if (result.affectedRows) {
    message = "Update film successful";
    updatedData = await getOne(req.params.id);
    status = true;
  }

  return { message, data: updatedData, status };
};

const deleteOne = async (id) => {
  let message = "Error in deleting film";
  let status = false;

  if (!(await getOne(id))) {
    message = `film with id: ${id} not found`;
    return { message, status };
  }

  const q = "DELETE FROM film WHERE id = ?";
  const result = await query(q, [id]);

  if (result.affectedRows) {
    message = "Delete film successful";
  }

  return { message, status };
};

export { getAll, getOne, createOne, updateOne, deleteOne, getByGenreId };
