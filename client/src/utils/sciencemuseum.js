import axios from 'axios';

export default {
    getInfoAge: () => {
        return axios.get('/api/scimuse/get')
    }
}

