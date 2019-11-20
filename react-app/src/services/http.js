import axios from "axios";

let baseUrl = "http://82.202.221.175:3001/api/";

const HTTP = axios.create({
  baseURL: baseUrl
});

export const getTable = async name => {
  let res = await HTTP.get(`table/${name}`);
  return res;
};

export const newTable = async (name, startDate, endDate) => {
  let res = await HTTP.post(`new`, {
    name,
    startDate,
    endDate
  });
  return res;
};

export const setCell = async (tableName, date, userId, color, content) => {
  let res = await HTTP.post(`setCell`, {
    tableName,
    date,
    userId,
    color,
    content
  });
  return res;
};

export const addPerson = async (tableName, userName, role) => {
  let res = await HTTP.post(`addPerson`, {
    tableName,
    userName,
    role
  });
  return res;
};

export const editPerson = async (tableName, userName, userId, role) => {
  let res = await HTTP.post(`editPerson`, {
    tableName,
    userId,
    userName,
    role
  });
  return res;
};

export const deletePerson = async (tableName, userId) => {
  let res = await HTTP.post(`deletePerson`, {
    tableName,
    userId
  });
  return res;
};

export const getAllTables = async () => {
  let res = await HTTP.get('tables')
  return res;
};
