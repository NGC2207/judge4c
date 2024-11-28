"use server";

import {
  APIError,
  HttpResponse,
  Organization,
  RequestParams,
  CreateOrgOption,
} from "gitea-js";
import api from "@/lib/gitea";
import callApi from "@/lib/api";
import logger from "@/lib/logger";

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
  logger.info("Fetching organizations...", context);
  const result = await callApi(
    () => api.orgs.orgGetAll(query, params),
    "List of organizations retrived",
    context
  );

  if (result.error) {
    logger.error("Failed to fetch organizations", result.error);
    return result.error as HttpResponse<Organization[], APIError>;
  }

  logger.info("Organizations fetched sucessfully", result.data);
  return result.data as HttpResponse<Organization[], APIError>;
}

export async function orgCreate(
  organization: CreateOrgOption,
  params?: RequestParams
): Promise<HttpResponse<Organization, APIError>> {
  const context = { organization, params };
  logger.info({ context }, "Creating organization...");
  const result = await callApi(
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
