import axios from 'axios';

export default {
  getSaved: (user) => {
    return axios.get('/saved/get', {user:user})
  }
}


