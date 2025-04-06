import APICall from "../apiCall";

const getDrawTypes = async () => {
  const response = await APICall("draw-type", "GET");
  return response;
};

const createDraw = async (payload: any) => {
  const response = await APICall("draw-type", "POST", payload);
  return response;
};

const getDraws = async () => {
  const response = await APICall("draws", "GET");
  return response;
};

const getDrawById = async (id: string) => {
  const response = await APICall(`draws/${id}`, "GET");
  return response;
};

const drawService = {
  getDrawTypes,
  getDraws,
  getDrawById,
  createDraw,
};

export default drawService;
