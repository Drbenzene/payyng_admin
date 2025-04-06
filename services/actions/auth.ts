import APICall from "../apiCall";

const loginAdmin = async (payload: any) => {
  const response = await APICall("auth/admin/login", "POST", payload);
  return response;
};

const changePassword = async (payload: any) => {
  const response = await APICall("users/password", "PATCH", payload);
  return response;
};

const authServices = {
  loginAdmin,
  changePassword,
};

export default authServices;
