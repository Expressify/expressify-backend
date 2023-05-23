import { getAll } from "../services/user.service.js";

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

export { getAllUserController };
