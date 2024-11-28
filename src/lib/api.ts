import logger from "./logger";
import { APIError } from "gitea-js";

async function callGiteaApi<T>(
  apiCall: () => Promise<T>,
  successMessage: string,
  context?: Record<string, unknown>
): Promise<{ data?: T; error?: APIError }> {
  try {
    logger.info({ context }, "Calling Gitea API...");
    const response = await apiCall();
    logger.info(successMessage, response);
    return { data: response };
  } catch (error) {
    const giteaAPIError = error as { error: APIError };
    logger.error(
      {
        error: giteaAPIError.error.message,
        url: giteaAPIError.error.url,
        context,
      },
      "API Error"
    );
    return { error: giteaAPIError.error };
  }
}

export default callGiteaApi;
