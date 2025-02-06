import api from '../service/api';

const editUsuario = async () => {
  try {
    const formDataString = sessionStorage.getItem('formData');
    if (!formDataString) {
      throw new Error('No form data found in sessionStorage');
    }

    const formData = JSON.parse(formDataString);
    const response = await api.put(`usuarios/editar/${formData.id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Full Error:', error);
    throw error;
  }
};

export { editUsuario };