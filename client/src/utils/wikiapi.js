import axios from 'axios';

export default {
  getWikiByArticle: (article) => {
    return axios.post('/api/wiki/post', {article:article})
  }
}


