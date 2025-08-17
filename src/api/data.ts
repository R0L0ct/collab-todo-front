import axios from "axios";

const API = "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const createTask = async (data: any) => {
  try {
    const response = await axiosInstance.post(`${API}/todo`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get(`${API}/todo`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id: number, data: any) => {
  try {
    const response = await axiosInstance.patch(`${API}/todo/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${API}/todo/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
