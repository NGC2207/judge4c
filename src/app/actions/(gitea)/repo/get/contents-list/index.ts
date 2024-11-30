"use server";

import {
  APIError,
  HttpResponse,
  RequestParams,
  ContentsResponse,
} from "gitea-js";
import api from "@/lib/gitea";
import logger from "@/lib/logger";
import callGiteaApi from "@/lib/api";

export async function repoGetContentsList(
  owner: string,
  repo: string,
  query?: {
    /** The name of the commit/branch/tag. Default the repository’s default branch (usually master) */
    ref?: string;
  },
  params?: RequestParams
): Promise<HttpResponse<ContentsResponse[], APIError>> {
  const context = { owner, repo, query, params };
  logger.info({ context }, "Getting contents list...");

  const result = await callGiteaApi(
    () => api.repos.repoGetContentsList(owner, repo, query, params),
    "Contents list fetched",
    context
  );

  if (result.error) {
    logger.error({ error: result.error }, "Failed to fetch contents list");
    return JSON.parse(JSON.stringify(result.error));
  }

  logger.info({ data: result.data }, "Contents list fetched successfully");
  return JSON.parse(JSON.stringify(result.data));
}
