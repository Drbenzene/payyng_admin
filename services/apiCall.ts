import axios from "axios";
import local from "next/font/local";
import { toast } from "sonner";
// const BASE_API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const BASE_API_URL: any = process.env.NEXT_PUBLIC_BASE_URL;

export default async function APICall(
  Url: any,
  Method: any,
  Data = null as any,
  isFormData = false,
  timeoutOverride?: number,
  silent?: boolean
) {
  const access_token = localStorage.getItem("accessToken");
  if (access_token) {
    const authToken = access_token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    axios.defaults.headers.common["Content-Type"] = isFormData
      ? "multipart/form-data"
      : `application/json`;
    axios.defaults.headers.common["cor"] = "no-cors";
  }
  // axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.authorization) {
        localStorage.setItem("access_token", response.data.authorization);
      }
      return response;
    },
    (error) => {
      return error.response;
    }
  );

  let baseUrl = BASE_API_URL;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  const response = await axios({
    method: Method,
    url: baseUrl + Url,
    data: Data,
    // timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  });

  if (response) {
    if (!response.status || response.status === 0) {
      if (!silent)
        toast.error(
          "Sorry it seems you are not connected to internet. Please check you network connection and try again"
        );
      return null;
    }
    if (response.status === 401 || response.statusText === "Unauthorized") {
      if (
        location.pathname !== "/sign-in" &&
        location.pathname !== "/settings"
      ) {
        localStorage.clear();
        window.location.href = "/";
        return null;
      }
    }
    if (response.status >= 400 && response.status < 500) {
      let message =
        "Sorry your request is invalid. please check your request and try again";
      if (response.data) {
        if (response.data.message) {
          message = `${response.data.message}`;
        } else {
          message = response.data;
        }
      }
      if (!silent) toast.warning(message);
      return null;
    }
    if (response.status >= 500) {
      let message =
        "Sorry your request cannot be processed at this moment please try again later";
      if (response.data.message) {
        message = `${response.data.message}`;
      }
      if (!silent) toast.error(message);
      return null;
    }
  } else {
    if (!silent) {
      toast.error("Please check your network connectivity and try again");
    }
  }

  return !response
    ? null
    : response.data
    ? response.data
    : { status: "success" };
}
