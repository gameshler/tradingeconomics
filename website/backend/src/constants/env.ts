const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const BASE_URL = getEnv("BASE_URL");
export const CLIENT_URL = getEnv("CLIENT_URL");
export const PORT = getEnv("PORT");
export const API_KEY = getEnv("API_KEY");
