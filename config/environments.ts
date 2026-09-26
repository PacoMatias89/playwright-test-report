import "dotenv/config";

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Mising required environment variable: ${name}`);
  }

  return value;
}

export const environment = {
  baseUrl: getRequiredEnvironmentVariable("BASE_URL"),
  apiBaseUrl: getRequiredEnvironmentVariable("API_BASE_URL"),
};
