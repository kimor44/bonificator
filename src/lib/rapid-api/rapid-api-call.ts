import { env } from "../env";
import { callApiUpdate } from "./call-api-update";

export const rapidApiCall = async (slug: string) => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const data = await fetch(
    `https://api-football-v1.p.rapidapi.com/v3/${slug}`,
    options,
  );

  const remainingRequest =
    Number(data.headers.get("X-RateLimit-requests-Remaining")) || 100;

  try {
    await callApiUpdate(remainingRequest);

    return await data.json();
  } catch (error) {
    throw new Error("Error updating the remaining request");
  }
};
