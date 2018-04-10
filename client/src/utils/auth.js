import axios from 'axios';


export default {
  register: (username, password) => {
    
    let newUser = {
      username: username,
      password: password
    }
    return axios.post('/auth/register', newUser)
  },

  login: (username, password, cb) => {
    let login = {
      username: username,
      password: password
    }
    axios.post(`/auth/login`, login )
    .then()
    .catch((error) => {
      cb(error)
    })
  }
}


