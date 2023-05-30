import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serviceKey = path.join(
  dirname,
  "../../rock-idiom-382209-f3ae7bd47068.json"
);

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID,
});
