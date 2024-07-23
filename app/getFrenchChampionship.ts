import { env } from "@/lib/env";

export const frenchChampionshipAction = async (remaining: number) => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };
  if (remaining === 0) {
    return { error: "You have reached the limit of requests" };
  } else {
    const data = await fetch(
      "https://api-football-v1.p.rapidapi.com/v3/leagues/seasons",
      options,
    );
    const remainingRequest = data.headers.get("X-RateLimit-requests-Remaining");
    const response = await data.json();

    return { response, remaining: remainingRequest };
  }
};
