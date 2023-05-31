import { storage } from "../configs/cloudBucket.config.js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const bucket = storage.bucket(process.env.BUCKET_NAME);

export const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    var ext = path.extname(originalname);

    const blob = bucket.file(
      Date.now().toString() + "-" + (Math.random() * 10e17).toString() + ext
    );
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", (err) => {
        console.log(err);
        reject(`Unable to upload image,`);
      })
      .end(buffer);
  });
