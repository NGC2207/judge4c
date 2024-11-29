"use server";

import {
  User,
  APIError,
  HttpResponse,
  RequestParams,
  CreateUserOption,
} from "gitea-js";
import api from "@/lib/gitea";
import logger from "@/lib/logger";
import callGiteaApi from "@/lib/api";

export async function adminCreateUser(
  body: CreateUserOption,
  params?: RequestParams
): Promise<HttpResponse<User, APIError>> {
  const context = { body, params };
  logger.info({ context }, "Creating user...");
  const result = await callGiteaApi(
    () => api.admin.adminCreateUser(body, params),
    "User created",
    context
  );

  if (result.error) {
    logger.error({ error: result.error }, "Failed to create user");
    return JSON.parse(JSON.stringify(result.error));
  }

  logger.info({ data: result.data }, "User created sucessfully");
  return JSON.parse(JSON.stringify(result.data));
}
