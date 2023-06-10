import { getOneByEmail } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import {
  jwtAccessSecret,
  jwtAccessExpiration,
} from "../configs/auth.config.js";
import { createOne } from "../services/user.service.js";

const registerController = async (req, res) => {
  try {
    const data = await createOne(req.body, req.file);
    if (data) {
      data.accessToken = jwt.sign(
        {
          id: data.id,
          nama: data.nama,
          email: data.email,
          user_profile_photo: data.user_profile_photo,
        },
        jwtAccessSecret
      );

      delete data.data.password;

      return res.status(200).json({ ...data });
    } else {
      throw Error("data yang dimasukkan tidak valid");
    }
  } catch (err) {
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
          user_profile_photo: data.user_profile_photo,
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
