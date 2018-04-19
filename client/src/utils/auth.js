import axios from 'axios';


export default {
  register: (email, password) => {
    let reg = {
      username: email,
      password: password
    }
    console.log('reg', reg)
    axios.post('/auth/register', reg)
    .then((res)=>{
      console.log(res, 'res')
    })
    .catch(err=> {
      console.log(err)
    })
  },

  login: (email, password, cb) => {
    let login = {
      username: email,
      password: password
    }
    return axios.post(`/auth/login`, login )

  },
  checkLogged: ()=> {
    return axios.get('/auth/login')
  },
  logout: () => {
    axios.get('/auth/logout')
  },
  getUser: (userId)=> {
    return axios.get(`/auth/one${userId}`)
  }
}


