import logger from "./logger";

async function callApi<T>(apiCall: () => Promise<T>): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    logger.error("API Error", {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    throw error;
  }
}

export default callApi;
