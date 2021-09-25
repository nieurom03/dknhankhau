import axios from "axios";

export const getDataList = () =>
  axios.get(`https://provinces.open-api.vn/api/?depth=3`);
