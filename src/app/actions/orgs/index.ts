import api from "@/lib/gitea";
import callApi from "@/lib/api";
import { CreateOrgOption, Organization } from "gitea-js";

// /orgs
// post
// Create an organization
export async function orgsPost(
  createOrgOption: CreateOrgOption
): Promise<Organization> {
  const response = await callApi(() => api.orgs.orgCreate(createOrgOption));
  return response.data;
}
