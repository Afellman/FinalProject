import axios from 'axios';
import Unsplash from 'unsplash-js'

export default {
  getPhotoByKeyword: (keyword) => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=7de102e87c96e657a715af82b989dbe4ec53d3a72e28eb724a3aeef76971283c`)
  }
}


