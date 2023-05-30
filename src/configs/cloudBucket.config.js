import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serviceKey = path.join(
  dirname,
  "../../rock-idiom-382209-a2dadd57c50f.json"
);

let storage;

if (process.env.NODE_ENV === "development") {
  storage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.PROJECT_ID,
  });
} else {
  storage = new Storage({
    keyFilename: {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
    },
    projectId: process.env.PROJECT_ID,
  });
}

export { storage };
