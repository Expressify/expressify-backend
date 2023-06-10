import { getOneByEmail } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import {
  jwtAccessSecret,
  jwtAccessExpiration,
} from "../configs/auth.config.js";
import {
  createOne as createUser,
  deleteOne as deleteUser,
} from "../services/user.service.js";
import { createOne as createUserGenre } from "../services/user_genre.service.js";

const registerController = async (req, res) => {
  const data = await createUser(req.body, req.file);
  try {
    const userGenre = [];
    if (data) {
      data.accessToken = jwt.sign(
        {
          id: data.data.id,
          nama: data.data.nama,
          email: data.data.email,
        },
        jwtAccessSecret
      );

      delete data.data.password;

      for (let i = 0; i < req.body.genre.length; i++) {
        const params = {
          genre_id: req.body.genre[i],
          user_id: data.data.id,
        };
        const genre = await createUserGenre(params);
        userGenre.push(genre.data);
      }
      Object.assign(data, { genre: userGenre });

      return res.status(200).json({ ...data });
    } else {
      throw Error("data yang dimasukkan tidak valid");
    }
  } catch (err) {
    await deleteUser(data.id);
    return res.status(500).json({
      message: `Gagal registrasi, ${err.message}`,
      status: false,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Password atau Username Kosong",
      status: false,
    });
  }

  try {
    const data = await getOneByEmail(email);
    if (data) {
      // const passwordIsValid = bcrypt.compareSync(password, data.password);
      const passwordIsValid = password == data.password;
      if (!passwordIsValid) {
        return res.status(404).json({
          message: "Password salah",
          status: false,
        });
      }

      // Create Access token
      data.accessToken = jwt.sign(
        {
          id: data.id,
          nama: data.nama,
          email: data.email,
        },
        jwtAccessSecret
        // {
        //   expiresIn: jwtAccessExpiration,
        // }
      );

      delete data.password;

      return res.json({
        data: data,
        message: "Berhasil Login",
        status: true,
      });
    } else {
      return res.status(404).json({
        message: "email tidak ditemukan, silahkan registrasi dulu",
        status: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `error, ${err.message}`,
      status: false,
    });
  }
};
export { loginController, registerController };
