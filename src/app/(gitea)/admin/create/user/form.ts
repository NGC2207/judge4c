"use client";

import React from "react";
import logger from "@/lib/logger";
import adminCreateUserStore from "./store";
import { CreateUserOption } from "gitea-js";
import { adminCreateUser } from "@/app/actions/admin/create/user";

const adminCreateUserForm = () => {
  const { visibility, username, email, password, must_change_password, set } =
    adminCreateUserStore();

  const handleChange =
    (key: keyof CreateUserOption) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      set(key, e.target.value as CreateUserOption[keyof CreateUserOption]);
    };

  const handleReset = () => {
    set("visibility", "public");
    set("username", "");
    set("email", "");
    set("password", "");
    set("must_change_password", true);
  };

  const handleSubmit = async () => {
    const createUserOption = {
      visibility,
      username,
      email,
      password,
      must_change_password,
    };

    const response = await adminCreateUser(createUserOption);
    logger.info({ response }, "User created");
    handleReset();
  };

  return {
    visibility,
    username,
    email,
    password,
    must_change_password,
    handleChange,
    handleReset,
    handleSubmit,
  };
};

export default adminCreateUserForm;
