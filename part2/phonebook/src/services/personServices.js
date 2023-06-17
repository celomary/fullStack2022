import axios from 'axios'

const baseUrl = "http://127.0.0.1:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const createNew = (data) => {
    const request = axios.post(baseUrl, data);
    return request.then(response => response.data);
}

const updatePerson = (id, data) => {
    const request = axios.put(`${baseUrl}/${id}`, data);
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.id)
}

const personServices = {
    getAll,
    createNew,
    deletePerson,
    updatePerson
};

export default personServices;
