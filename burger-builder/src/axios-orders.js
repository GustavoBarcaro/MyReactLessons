import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-2f7a6.firebaseio.com/'
})

export default instance;