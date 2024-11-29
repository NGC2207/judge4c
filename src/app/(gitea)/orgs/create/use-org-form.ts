"use client";

import logger from "@/lib/logger";
import useOrgsPostStore from "./org-form-store";
import { CreateOrgOption } from "gitea-js";
import { orgCreate } from "@/app/actions/(gitea)/orgs";

const useOrgsPostForm = () => {
  const {
    description,
    email,
    full_name,
    location,
    repo_admin_change_team_access,
    username,
    visibility,
    website,
    set,
  } = useOrgsPostStore();

  const handleChange =
    (key: keyof CreateOrgOption) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      set(key, e.target.value as CreateOrgOption[keyof CreateOrgOption]);
    };

  const resetForm = () => {
    set("description", "");
    set("email", "");
    set("full_name", "");
    set("location", "");
    set("username", "");
    set("visibility", "public");
    set("website", "");
  };

  const handleSubmit = async () => {
    const createOrgOption = {
      description,
      email,
      full_name,
      location,
      repo_admin_change_team_access,
      username,
      visibility,
      website,
    };

    const response = await orgCreate(createOrgOption);
    logger.info({ response }, "Organization created");
    resetForm();
  };

  return {
    description,
    email,
    full_name,
    location,
    repo_admin_change_team_access,
    username,
    visibility,
    website,
    handleChange,
    resetForm,
    handleSubmit,
  };
};

export default useOrgsPostForm;
