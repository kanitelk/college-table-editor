import axios from "axios";

let baseUrl = "http://localhost/api/";

const HTTP = axios.create({
  baseURL: baseUrl
});

export const getTable = async id => {
  let res = await HTTP.get(`table/${id}`);
  return res;
};
