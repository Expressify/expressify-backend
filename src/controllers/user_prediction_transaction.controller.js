import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../services/user_prediction_transaction.service.js";

const getAllUserPredictionTransactionController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getAll(),
      message: "success fetching user_prediction_transaction",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const getOneUserPredictionTransactionController = async (req, res) => {
  try {
    return res.status(200).json({
      data: await getOne(req.params.id),
      message: "Success fetching user_prediction_transaction data",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};

const createOneUserPredictionTransactionController = async (req, res) => {
  try {
    console.log(req.body);
    const createResult = await createOne(req.body, req.file);

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

const updateOneUserPredictionTransactionController = async (req, res) => {
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
  getAllUserPredictionTransactionController,
  getOneUserPredictionTransactionController,
  updateOneUserPredictionTransactionController,
  createOneUserPredictionTransactionController,
};
