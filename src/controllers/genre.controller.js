import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../services/genre.service.js";
import { getByGenreId as getBookByGenreId } from "../services/buku.service.js";
import { getByGenreId as getFilmByGenreId } from "../services/film.service.js";
import { getByGenreId as getMusikByGenreId } from "../services/musik.service.js";

const getAllGenreController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getAll(),
      message: "success fetching genre",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getOneGenreController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getOne(req.params.id),
      message: "Success fetching genre data",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getBukuByGenreIdController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getBookByGenreId(req.params.id),
      message: "Success fetching books with specific genre",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getFilmByGenreIdController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getFilmByGenreId(req.params.id),
      message: "Success fetching films with specific genre",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getMusikByGenreIdController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getMusikByGenreId(req.params.id),
      message: "Success fetching musics with specific genre",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const createOneGenreController = async (req, res) => {
  try {
    console.log(req.body);
    const createResult = await createOne(req.body);

    if (createResult.data) {
      return res.status(200).json(createResult);
    }
    return res.status(422).json(createResult);
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const updateOneGenreController = async (req, res) => {
  try {
    const updateResult = await updateOne(req);

    if (updateResult.data) {
      return res.status(200).json(updateResult);
    }
    return res.status(422).json(updateResult);
  } catch (err) {
    return res.status(500).json({
      message: `error ${err.message}`,
      status: false,
    });
  }
};

export {
  getAllGenreController,
  getOneGenreController,
  updateOneGenreController,
  createOneGenreController,
  getBukuByGenreIdController,
  getFilmByGenreIdController,
  getMusikByGenreIdController,
};
