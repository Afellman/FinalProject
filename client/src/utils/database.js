import axios from 'axios';

export default {
  //Saved Route 
  getSaved: (user) => {
    return axios.get('/saved/articles', {user:user})
  },

  //Post route
  postArticle: (museumObj) => {
    return axios.post('/saved/articles', {museumObj: museumObj})
  },

  //Delete route
  deleteArticle: (museumObj) =>{
    return axios.delete('/saved/articles', {museumObj: museumObj})
  }
}


