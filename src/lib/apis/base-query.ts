import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import HandleLogout from "../utils/handle-logout";
export const baseQuery = fetchBaseQuery({
  baseUrl: "/v1",
  credentials: "include",
});

export const baseQueryWithToast: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as { status: number; data?: any };
    let errorMessage = "An error occurred";

    if (error.status === 401) {
      errorMessage = "Unauthorized - Please log in again";
      toast.error(errorMessage);
      await baseQuery(
        { url: "/auth/logout", method: "POST" },
        api,
        extraOptions
      );
      window.location.href = "login";
    } else if (error.status === 403) {
      errorMessage = "You don't have permission to perform this action";
      toast.error(errorMessage);
    } else if (error.status === 400) {
      errorMessage = error.data?.message ?? "Invalid request";
      toast.error(errorMessage);
    } else if (error.data?.message) {
      toast.error(error.data.message);
    } else if (typeof error.data === "string") {
      toast.error(error.data);
    }
  }

  return result;
};
