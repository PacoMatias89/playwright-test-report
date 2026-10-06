import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { config } from "dotenv";

const selectedEnvironment = process.env.TEST_ENV?.trim();

const environmentFile = selectedEnvironment
  ? `.env.${selectedEnvironment}`
  : ".env";

const environmentPath = resolve(process.cwd(), environmentFile);

if (existsSync(environmentPath)) {
  config({
    path: environmentPath,
    quiet: true,
  });
}

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Provide it through ${environmentFile} or the execution environment.`,
    );
  }

  return value;
}

export const environment = {
  name: selectedEnvironment ?? "default",
  baseUrl: getRequiredEnvironmentVariable("BASE_URL"),
  apiBaseUrl: getRequiredEnvironmentVariable("API_BASE_URL"),
};
