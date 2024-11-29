"use client";

import logger from "@/lib/logger";
import useTeamsPostStore from "./team-form-store";
import { CreateTeamOption } from "gitea-js";
import { orgCreateTeam } from "@/app/actions/(gitea)/teams";
import { orgGetAll } from "@/app/actions/(gitea)/orgs";
import { useEffect } from "react";

const useTeamsPostForm = () => {
  const {
    name,
    description,
    permission,
    organizations,
    selectedOrg,
    set,
    setOrganizations,
    setSelectedOrg,
  } = useTeamsPostStore();

  const handleChange =
    (key: keyof CreateTeamOption) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      set(key, e.target.value as CreateTeamOption[keyof CreateTeamOption]);
    };

  const resetForm = () => {
    set("name", "");
    set("description", "");
    set("permission", "read");
    setSelectedOrg("");
  };

  const handleSubmit = async () => {
    const createTeamOption: CreateTeamOption = {
      name,
      description,
      permission,
      // 提供默认的 units 或 units_map 值
      units: ["repo.code", "repo.issues", "repo.pulls"],
      units_map: {
        "repo.code": "read",
        "repo.issues": "write",
        "repo.pulls": "admin",
      },
    };

    const response = await orgCreateTeam(selectedOrg, createTeamOption);
    logger.info({ response }, "Team created");
    resetForm();
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await orgGetAll();
      if (response.data) {
        setOrganizations(response.data);
        if (response.data.length > 0) {
          setSelectedOrg(response.data[0].username || "");
        }
      }
    };

    fetchOrganizations();
  }, [setOrganizations, setSelectedOrg]);

  return {
    name,
    description,
    permission,
    organizations,
    selectedOrg,
    handleChange,
    resetForm,
    handleSubmit,
    setSelectedOrg,
  };
};

export default useTeamsPostForm;
