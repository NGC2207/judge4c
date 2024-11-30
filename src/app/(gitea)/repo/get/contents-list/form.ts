import logger from "@/lib/logger";
import getContentsListStore, { GetContentsListState } from "./store";
import { repoGetContentsList } from "@/app/actions/(gitea)/repo/get/contents-list";

const RepoGetContentsListForm = () => {
  const { owner, repo, set, reset } = getContentsListStore();

  const handleChange =
    (key: keyof GetContentsListState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      set(
        key,
        e.target.value as GetContentsListState[keyof GetContentsListState]
      );
    };

  const handleReset = () => {
    reset();
  };

  const handleSubmit = async () => {
    const response = await repoGetContentsList(owner, repo);
    logger.info({ response }, "Contents list fetched");
    handleReset();
  };

  return {
    owner,
    repo,
    handleChange,
    handleReset,
    handleSubmit,
  };
};

export default RepoGetContentsListForm;
