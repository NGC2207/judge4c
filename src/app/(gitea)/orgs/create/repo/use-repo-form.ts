"use client";

import logger from "@/lib/logger";
import useRepoPostStore from "./repo-form-store";
import { CreateRepoOption } from "gitea-js";
import { createOrgRepo } from "@/app/actions/(gitea)/repo";

const useRepoPostForm = () => {
  const {
    auto_init,
    default_branch,
    description,
    gitignores,
    issue_labels,
    license,
    name,
    object_format_name,
    private: isPrivate,
    readme,
    template,
    trust_model,
    org,
    set,
  } = useRepoPostStore();

  const handleChange =
    (key: keyof CreateRepoOption | "org") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      set(
        key,
        e.target.value as CreateRepoOption[keyof CreateRepoOption] | string
      );
    };

  const resetForm = () => {
    set("auto_init", false);
    set("default_branch", "main");
    set("description", "");
    set("gitignores", "");
    set("issue_labels", "");
    set("license", "");
    set("name", "");
    set("object_format_name", "sha1");
    set("private", false);
    set("readme", "");
    set("template", false);
    set("trust_model", "default");
    set("org", "");
  };

  const handleSubmit = async () => {
    const createRepoOption = {
      auto_init,
      default_branch,
      description,
      gitignores,
      issue_labels,
      license,
      name,
      object_format_name,
      private: isPrivate,
      readme,
      template,
      trust_model,
    };

    const response = await createOrgRepo(org, createRepoOption);
    logger.info({ response }, "Repository created");
    resetForm();
  };

  return {
    auto_init,
    default_branch,
    description,
    gitignores,
    issue_labels,
    license,
    name,
    object_format_name,
    private: isPrivate,
    readme,
    template,
    trust_model,
    org,
    handleChange,
    resetForm,
    handleSubmit,
  };
};

export default useRepoPostForm;
