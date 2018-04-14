import axios from 'axios';

export default {
  getSaved: (user) => {
    return axios.get('/saved/articles', {user:user})
  },

  //need a post. passing museumobj

  // postArticle: (museumObj) => {
  //   return axios.post('/saved/articles', {museumObj: museumObj})
  // }
}


