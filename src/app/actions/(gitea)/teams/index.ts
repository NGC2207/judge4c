"use server";

import callGiteaApi from "@/lib/api";
import api from "@/lib/gitea";
import logger from "@/lib/logger";
import {
  APIError,
  CreateTeamOption,
  HttpResponse,
  RequestParams,
  Team,
} from "gitea-js";

export async function orgCreateTeam(
  org: string,
  team: CreateTeamOption,
  params?: RequestParams
): Promise<HttpResponse<Team, APIError>> {
  const context = { org, team, params };
  logger.info({ context }, "Creating team...");
  const result = await callGiteaApi(
    () => api.orgs.orgCreateTeam(org, team, params),
    "Team created",
    context
  );

  if (result.error) {
    logger.error({ error: result.error }, "Failed to create team");
    return JSON.parse(JSON.stringify(result.error));
  }

  logger.info({ data: result.data }, "Team created successfully");
  return JSON.parse(JSON.stringify(result.data));
}
