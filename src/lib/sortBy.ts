// function that sorts an array of objects by a key
export function sortBy<T>(
  payload: T[],
  key: keyof T,
  orderBy: "asc" | "desc" = "asc",
): T[] {
  const sortedPayload =
    orderBy === "asc"
      ? payload.sort((a, b) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        })
      : payload.sort((a, b) => {
          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
          return 0;
        });

  return sortedPayload;
}
