import { storage } from "../configs/cloudBucket.config.js";
import * as dotenv from "dotenv";

dotenv.config();

const bucket = storage.bucket(process.env.BUCKET_NAME);

export const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
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
