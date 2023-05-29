import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../services/genre_film.service.js";

const getAllGenreFilmController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getAll(),
      message: "success fetching genre_film",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getOneGenreFilmController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getOne(req.params.id),
      message: "Success fetching genre_film data",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const createOneGenreFilmController = async (req, res) => {
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

const updateOneGenreFilmController = async (req, res) => {
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
  getAllGenreFilmController,
  getOneGenreFilmController,
  updateOneGenreFilmController,
  createOneGenreFilmController,
};
