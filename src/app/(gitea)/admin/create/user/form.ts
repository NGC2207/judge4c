"use client";

import { z } from "zod";
import logger from "@/lib/logger";
import React, { useState } from "react";
import adminCreateUserStore from "./store";
import { CreateUserOption } from "gitea-js";
import { adminCreateUser } from "@/app/actions/(gitea)/admin/create/user";

const adminCreateUserFormSchema = z.object({
  visibility: z.enum(["public", "limited", "private"]),
  username: z
    .string()
    .min(1, "Username is required")
    .max(40, "Username is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be at most 255 characters"),
  must_change_password: z.boolean(),
});

type AdminCreateUserFormData = z.infer<typeof adminCreateUserFormSchema>;

const AdminCreateUserForm = () => {
  const { visibility, username, email, password, must_change_password, set } =
    adminCreateUserStore();

  const [errors, setErrors] = useState<Partial<
    Record<keyof AdminCreateUserFormData, string[]>
  > | null>(null);

  const handleChange =
    (key: keyof CreateUserOption) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value: string | boolean = e.target.value;
      if (key === "must_change_password") {
        value = value === "true";
      }
      set(key, value as CreateUserOption[keyof CreateUserOption]);
    };

  const handleReset = () => {
    set("visibility", "public");
    set("username", "");
    set("email", "");
    set("password", "");
    set("must_change_password", true);
    setErrors(null);
  };

  const handleSubmit = async () => {
    const createUserOption = {
      visibility,
      username,
      email,
      password,
      must_change_password,
    };

    const validationResult =
      adminCreateUserFormSchema.safeParse(createUserOption);

    if (!validationResult.success) {
      const errors = validationResult.error.formErrors.fieldErrors;
      logger.error({ errors }, "Validation error");
      setErrors(
        errors as Partial<Record<keyof AdminCreateUserFormData, string[]>>
      );
      return;
    }

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
    errors,
  };
};

export default AdminCreateUserForm;
