"use server";

import {
  APIError,
  HttpResponse,
  Organization,
  RequestParams,
  CreateOrgOption,
} from "gitea-js";
import api from "@/lib/gitea";
import logger from "@/lib/logger";
import callGiteaApi from "@/lib/api";

export async function orgGetAll(
  query?: {
    /** page number of results to return (1-based) */
    page?: number;
    /** page size of results */
    limit?: number;
  },
  params?: RequestParams
): Promise<HttpResponse<Organization[], APIError>> {
  const context = { query, params };
  logger.info({ context }, "Fetching organizations...");
  const result = await callGiteaApi(
    () => api.orgs.orgGetAll(query, params),
    "List of organizations retrived",
    context
  );

  if (result.error) {
    logger.error({ error: result.error }, "Failed to fetch organizations");
    return result.error as HttpResponse<Organization[], APIError>;
  }

  logger.info({ data: result.data }, "Organizations fetched sucessfully");
  return result.data as HttpResponse<Organization[], APIError>;
}

export async function orgCreate(
  organization: CreateOrgOption,
  params?: RequestParams
): Promise<HttpResponse<Organization, APIError>> {
  const context = { organization, params };
  logger.info({ context }, "Creating organization...");
  const result = await callGiteaApi(
    () => api.orgs.orgCreate(organization, params),
    "Organization created",
    context
  );

  if (result.error) {
    logger.error({ error: result.error }, "Failed to create organization");
    return result.error as HttpResponse<Organization, APIError>;
  }

  logger.info({ data: result.data }, "Organization created sucessfully");
  return result.data as HttpResponse<Organization, APIError>;
}
