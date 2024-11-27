import fetch from "cross-fetch";
import { giteaApi } from "gitea-js";

if (!process.env.GITEA_URL) {
  throw new Error("GITEA_URL is not defined");
}

if (!process.env.GITEA_TOKEN) {
  throw new Error("GITEA_TOKEN is not defined");
}

const api = giteaApi(process.env.GITEA_URL, {
  token: process.env.GITEA_TOKEN,
  customFetch: fetch,
});

export default api;
