"use server";

import {
  APIError,
  FileResponse,
  HttpResponse,
  RequestParams,
  CreateFileOptions,
} from "gitea-js";
import api from "@/lib/gitea";
import logger from "@/lib/logger";
import callGiteaApi from "@/lib/api";

export async function repoCreateFile(
  owner: string,
  repo: string,
  filepath: string,
  body: CreateFileOptions,
  params?: RequestParams
): Promise<HttpResponse<FileResponse, APIError>> {
  const context = { owner, repo, filepath, body, params };
  logger.info({ context }, "Creating file...");
  const result = await callGiteaApi(
    () => api.repos.repoCreateFile(owner, repo, filepath, body, params),
    "File created",
    context
  );

  if (result.error) {
    logger.error({ error: result.error }, "Failed to create file");
    return JSON.parse(JSON.stringify(result.error));
  }

  logger.info({ data: result.data }, "File created sucessfully");
  return JSON.parse(JSON.stringify(result.data));
}
