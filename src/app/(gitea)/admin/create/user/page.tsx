"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import adminCreateUserForm from "./form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminCreateUserPage() {
  const {
    visibility,
    username,
    email,
    password,
    must_change_password,
    handleChange,
    handleReset,
    handleSubmit,
  } = adminCreateUserForm();

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto min-w-80">
        <CardHeader>
          <CardTitle className="text-2xl">Gitea</CardTitle>
          <CardDescription>Admin Create User Card</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username of the user"
                  required
                  value={username}
                  onChange={handleChange("username")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email of the user"
                  required
                  value={email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password of the user"
                  required
                  value={password}
                  onChange={handleChange("password")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="must_change_password">
                  Must Change Password
                </Label>
                <Select
                  value={must_change_password ? "true" : "false"}
                  onValueChange={(value) =>
                    handleChange("must_change_password")({
                      target: { value },
                    } as React.ChangeEvent<HTMLSelectElement>)
                  }
                >
                  <SelectTrigger id="must_change_password">
                    <SelectValue placeholder="Must Change Password" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
