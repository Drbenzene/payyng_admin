import APICall from "../apiCall";

const getGameTypes = async () => {
  const response = await APICall("games/types", "GET");
  return response;
};
