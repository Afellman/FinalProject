import axios from 'axios';

export default {
    getSciMuse: (category) => {
        axios.post('/api/scimuse/post',{category: category})
         .then((data) => {
             console.log(data,"blah")
         })
    }
}

