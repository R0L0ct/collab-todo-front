import axios from "axios";

const API = "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const createTask = async (data: any, accessToken: any) => {
  try {
    if (!accessToken) return;

    const response = await axiosInstance.post(`${API}/todo`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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

export const register = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(`${API}/auth/register`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post(`${API}/auth/login`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get(`${API}/auth/refresh-token`);
    return response;
  } catch (error) {
    throw error;
  }
};
