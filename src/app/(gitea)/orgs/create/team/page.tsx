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
import useTeamsPostForm from "./use-team-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TeamsPostPage() {
  const {
    name,
    description,
    permission,
    organizations,
    selectedOrg,
    handleChange,
    resetForm,
    handleSubmit,
    setSelectedOrg,
  } = useTeamsPostForm();

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Team</CardTitle>
          <CardDescription>Create a new team</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="organization">Organization</Label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger id="organization">
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {organizations.map((org) => (
                      <SelectItem key={org.username ?? ''} value={org.username ?? ''}>
                        {org.full_name || org.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of the team"
                  value={name}
                  onChange={handleChange("name")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of the team"
                  value={description}
                  onChange={handleChange("description")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="permission">Permission</Label>
                <Select
                  value={permission}
                  onValueChange={(value) =>
                    handleChange("permission")({
                      target: { value },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  <SelectTrigger id="permission">
                    <SelectValue placeholder="Permission" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="write">Write</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
