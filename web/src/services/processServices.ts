import axios from "axios";
import { Process, Response } from "document/types/processTypes";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getProcesses = async (): Promise<Process[]> => {
  const response = await api.get("/api/processes");
  return response.data;
};

export const deleteProcess = async (id: number): Promise<Response> => {
  const response = await api.delete(`/api/processes/${id}`);

  return response.data;
};

export const createProcess = async (
  data: Omit<Process, "id" | "created_at" | "updated_at" | "state">
): Promise<Process | Response> => {
  const response = await api.post("/api/processes", data);
  return response.data;
};

export const updateProcess = async (
  id: number,
  data: Omit<Process, "id" | "created_at" | "updated_at" | "state">
): Promise<Process | Response> => {
  const response = await api.put(`/api/processes/${id}`, data);
  return response.data;
};
