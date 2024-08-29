import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export interface Note {
  id: string;
  title: string;
  completed: boolean;
}

export const getNodesApi = async () => {
  const resp = await instance.get("/");
  return resp.data as Note[];
};

export const addNoteApi = async (title: string) => {
  const resp = await instance.post("/", { title, completed: false });
  return resp.data as Note;
};

export const editNoteApi = async (note: Note) => {
  const resp = await instance.put(`/${note.id}`, note);
  return resp.data as Note;
};

export const deleteNoteApi = async (id: string) => {
  await instance.delete(`/${id}`);
};
