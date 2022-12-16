import axios from 'axios';

export const KEY = "c75e43288f3d141adcea7c38ba53da51";

export default axios.create({
    baseURL: 'https://api.openweathermap.org',
});