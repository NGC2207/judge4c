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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOrgsPostForm from "./use-orgs-post";
import { Button } from "@/components/ui/button";

export default function OrgsPostPage() {
  const {
    description,
    email,
    full_name,
    location,
    username,
    visibility,
    website,
    handleChange,
    resetForm,
    handleSubmit,
  } = useOrgsPostForm();

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
          <CardDescription>Create a new organization</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username of the organization"
                  value={username}
                  onChange={handleChange("username")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  placeholder="Full name of the organization"
                  value={full_name}
                  onChange={handleChange("full_name")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of the organization"
                  value={description}
                  onChange={handleChange("description")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="Website of the organization"
                  value={website}
                  onChange={handleChange("website")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="website">Email</Label>
                <Input
                  id="email"
                  placeholder="Email of the organization"
                  value={email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Location of the organization"
                  value={location}
                  onChange={handleChange("location")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={visibility}
                  onValueChange={(value) =>
                    handleChange("visibility")({
                      target: { value },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="limited">Limited</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
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
