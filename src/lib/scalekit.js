import { Scalekit } from "@scalekit-sdk/node";

const getEnv = (key) => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing env variable: ${key}`);
    }

    return value;
};

const scalekit = new Scalekit(
    getEnv("NEXT_PUBLIC_SCALEKIT_ENVIRONMENT_URL"),
    getEnv("NEXT_SCALEKIT_CLIENT_ID"),
    getEnv("NEXT_SCALEKIT_CLIENT_SECRET")
);

export default scalekit;