import { load } from "@std/dotenv";

type EnvKeys =
  | "TECH_RUSH_MAIL_TEMPLATE"
  | "TECH_RUSH_MAIL_API_KEY"
  | "TECH_RUSH_MAIL_SENDER"
  | "TECH_RUSH_MAIL_RECEIVER";

export const getEnvValue = async (key: EnvKeys): Promise<string> => {
  const denoEnv = Deno.env.get(key);

  if (denoEnv) {
    return denoEnv;
  }

  console.log(
    "Did not find env variable in Deno.env; Trying to get .env file variables",
  );
  const env = await load();
  const value = env[key];

  if (!value) {
    throw new Error(`Could not find env variable with key "${key}"`);
  }

  return env[key];
};
