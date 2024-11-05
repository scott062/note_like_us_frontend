import api from '../api'


const baseURL = 'http://localhost:8000';

// AUTH
export const login = async ({ username, password }) => {
  try {
    const response = await api.post(`${baseURL}/api/login/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
  };
};

export const logout = async () => {
  try {
    const response = await api.post(`${baseURL}/api/logout/`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
  };
};

export const register = async (data) => {
  try {
    const response = await api.post(`${baseURL}/api/register/`, data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
  };
};

// CRUD NOTES
export const fetchNotes = async () => {
  try {
    const response = await api.get(`${baseURL}/api/v1/notes/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
  };
};

export const fetchNote = async (id) => {
  try {
    const response = await api.get(`${baseURL}/api/v1/notes/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note:', error);
  };
};

export const createNote = async (data) => {
  try {
    const response = await api.post(`${baseURL}/api/v1/notes/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
  };
};

export const editNote = async (data) => {
  try {
    const response = await api.put(`${baseURL}/api/v1/notes/${data.id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
  };
};

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`${baseURL}/api/v1/notes/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
  };
};
