import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../services/user.service.js";

const getAllUserController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getAll(),
      message: "success fetching user data",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getOneUserController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getOne(req.params.id),
      message: "Success fetching user data",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const createOneUserController = async (req, res) => {
  try {
    const createResult = await createOne(req.body);

    if (createResult.data) {
      return res.status(200).json({
        data: createResult.data,
        message: "Success create user",
        status: true,
      });
    }
    return res.status(422).json(createResult);
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const updateOneUserController = async (req, res) => {
  try {
    const updateResult = await updateOne(req);

    if (updateResult.data) {
      return res.status(200).json(updateResult);
    }
    return res;
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

export {
  getAllUserController,
  getOneUserController,
  updateOneUserController,
  createOneUserController,
};
