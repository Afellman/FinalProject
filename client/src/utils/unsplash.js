import axios from 'axios';
import Unsplash from 'unsplash-js'


// const unsplash = new Unsplash({
//   applicationId: "7de102e87c96e657a715af82b989dbe4ec53d3a72e28eb724a3aeef76971283c",
//   secret: "8448f2764fb176f221f8f3f1109607bbf7d0e4f8923dd879dc063c542d2468f2",
//   callbackUrl: "{CALLBACK_URL}",
//   headers: {
//     authentication: "Client-ID 7de102e87c96e657a715af82b989dbe4ec53d3a72e28eb724a3aeef76971283c"
//   } 
// });


export default {
  getPhotoByKeyword: (keyword) => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=7de102e87c96e657a715af82b989dbe4ec53d3a72e28eb724a3aeef76971283c`)
  }
}


