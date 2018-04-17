import axios from 'axios';

export default {
  //Saved Route 
  getSaved: (user) => {
    return axios.get('/api/saved/articles', {user:user})
  },

  //Post route
  postArticle: (museumObj) => {
    return axios.post('/api/saved/articles', {museumObj: museumObj})
  },

  //Delete route
  deleteArticle: (museumObj) =>{
    return axios.delete('/api/saved/articles', {museumObj: museumObj})
  }
}


