import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../services/user_profile_photo.service.js";

const getAllUserProfilePhotoController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getAll(),
      message: "success fetching user_profile_photo",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getOneUserProfilePhotoController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getOne(req.params.id),
      message: "Success fetching user_profile_photo data",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const createOneUserProfilePhotoController = async (req, res) => {
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

const updateOneUserProfilePhotoController = async (req, res) => {
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
  getAllUserProfilePhotoController,
  getOneUserProfilePhotoController,
  updateOneUserProfilePhotoController,
  createOneUserProfilePhotoController,
};
