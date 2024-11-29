"use server";

import callGiteaApi from "@/lib/api";
import api from "@/lib/gitea";
import logger from "@/lib/logger";
import {
  APIError,
  CreateRepoOption,
  HttpResponse,
  Repository,
  RequestParams,
} from "gitea-js";

export async function createOrgRepo(
  org: string,
  body: CreateRepoOption,
  params?: RequestParams
): Promise<HttpResponse<Repository, APIError>> {
  const context = { org, body, params };
  logger.info({ context }, "Creating repository in organization...");
  const result = await callGiteaApi(
    () => api.orgs.createOrgRepo(org, body, params),
    "Repository created in organization",
    context
  );

  if (result.error) {
    logger.error(
      { error: result.error },
      "Failed to create repository in organization"
    );
    return JSON.parse(JSON.stringify(result.error));
  }

  logger.info(
    { data: result.data },
    "Repository created in organization successfully"
  );
  return JSON.parse(JSON.stringify(result.data));
}
