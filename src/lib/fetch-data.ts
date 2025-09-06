// util to fetch data from api
export const fetchData = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_V1}/${url}`, {
    credentials: "include",
  });
  return res.json();
};
