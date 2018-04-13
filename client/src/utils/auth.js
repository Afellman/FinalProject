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
    axios.post(`/auth/login`, login )
    .then()
    .catch((error) => {
      cb(error)
    })
  },
  checkLogged: ()=> {
    axios.get('/auth/login')
    .then((res)=> {
      console.log(res)
    })
  },
  logout: () => {
    axios.get('/auth/logout')
  }
}


