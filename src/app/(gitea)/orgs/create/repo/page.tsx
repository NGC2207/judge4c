"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRepoPostForm from "./use-repo-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { orgGetAll } from "@/app/actions/orgs";

export default function RepoPostPage() {
  const {
    // auto_init,
    // default_branch,
    description,
    // gitignores,
    // issue_labels,
    // license,
    name,
    // object_format_name,
    // private: isPrivate,
    // readme,
    // template,
    // trust_model,
    org,
    handleChange,
    resetForm,
    handleSubmit,
  } = useRepoPostForm();

  const [organizations, setOrganizations] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await orgGetAll();
      if (response.data) {
        setOrganizations(response.data.map((org) => org.username).filter((username): username is string => username !== undefined));
      }
    };
    fetchOrganizations();
  }, []);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Repository</CardTitle>
          <CardDescription>Create a new repository</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Repository Name</Label>
                <Input
                  id="name"
                  placeholder="Name of the repository"
                  value={name}
                  onChange={handleChange("name")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of the repository"
                  value={description}
                  onChange={handleChange("description")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="org">Organization</Label>
                <Select
                  value={org}
                  onValueChange={(value) =>
                    handleChange("org")({
                      target: { value },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  <SelectTrigger id="org">
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Add other fields as needed */}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
