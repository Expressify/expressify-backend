import { getAll } from "../services/user.service.js";

const getAllUserController = async (req, res) => {
  try {
    res.status(200).json(await getAll());
  } catch (err) {
    console.error(`Error fetching all user`, err.message);
  }
};

export { getAllUserController };
