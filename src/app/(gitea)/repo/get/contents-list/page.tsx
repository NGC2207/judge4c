"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RepoGetContentsListForm from "./form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RepoGetContentsListPage() {
  const { owner, repo, handleChange, handleReset, handleSubmit } =
    RepoGetContentsListForm();

  return (
    <div className="h-full w-full flex items-center justify-center px-4">
      <Card className="mx-auto min-w-80">
        <CardHeader>
          <CardTitle className="text-2xl">Gitea</CardTitle>
          <CardDescription>Repo Get Contents List Card</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  placeholder="Owner of the repository"
                  value={owner}
                  onChange={handleChange("owner")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="repo">Repository</Label>
                <Input
                  id="repo"
                  placeholder="Name of the repository"
                  value={repo}
                  onChange={handleChange("repo")}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Get</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
