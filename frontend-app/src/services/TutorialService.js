import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API
});

const getTutorials = (filter) => axiosInstance.get(`tutorials${!filter ? '' : `?filter=${filter}`}`);

const massDeleteTutorials = () => axiosInstance.delete('tutorials/mass_delete')

const createTutorial = async (data) => {
    const response = await axiosInstance.post('login');
    const customToken = response.data.result;

    return axiosInstance.post('tutorials', data, { headers: { 'authentication-token': customToken} })
}

const updateTutorial = (id, data) => axiosInstance.put(`tutorials/${id}`, data)

const deleteTutorial = (id) => axiosInstance.delete(`tutorials/${id}`);

export default {
    createTutorial,
    getTutorials,
    massDeleteTutorials,
    updateTutorial,
    deleteTutorial
}