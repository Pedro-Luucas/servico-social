import api from '../service/api';

const submitUsuario = async () => {
  try {
    const formDataString = sessionStorage.getItem('formData');
    if (!formDataString) {
      throw new Error('No form data found in sessionStorage');
    }

    const formData = JSON.parse(formDataString);
    const response = await api.post('usuarios', formData);
    return response.data;
  } catch (error) {
    console.error('Full Error:', error);
    throw error;
  }
};

export { submitUsuario };