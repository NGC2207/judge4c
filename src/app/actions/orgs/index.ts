"use server";

import api from "@/lib/gitea";
import callApi from "@/lib/api";
import { CreateOrgOption, Organization } from "gitea-js";

// /orgs
// get
// Get list of organizations
export async function orgsGet(): Promise<Organization[]> {
  const response = await callApi(() => api.orgs.orgGetAll());
  return response.data;
}

// /orgs
// post
// Create an organization
export async function orgsPost(
  createOrgOption: CreateOrgOption
): Promise<Organization> {
  const response = await callApi(() => api.orgs.orgCreate(createOrgOption));
  return response.data;
}
