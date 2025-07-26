// import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V1,
//   credentials: "include",

// });
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "sonner"; // or your toast library

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V1,
  credentials: "include",
});

export const baseQueryWithToast = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check if there's an error in the response
  if (result.error) {
    const error = result.error as { status: number; data: any };
    let errorMessage = "An error occurred";

    // Handle different types of errors
    if (error.status === 401) {
      errorMessage = "Unauthorized - Please log in again";
    } else if (error.status === 403) {
      errorMessage = "You don't have permission to perform this action";
    } else if (error.status === 400) {
      errorMessage = error.data.message;
    } else if (error.data?.message) {
      errorMessage = error.data.message;
    } else if (typeof error.data === "string") {
      errorMessage = error.data;
    }

    // Show error toast
    // console.log("error message",errorMessage)
    // console.error("global error", error);
    toast.error(errorMessage);
  }

  return result;
};
