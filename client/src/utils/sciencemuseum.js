import axios from 'axios';

export default {
    getInfoAge: () => {
        axios({
            url:'http://collection.sciencemuseum.org.uk/search/objects/gallery/information%20age%20gallery:%20web?random=20',
            method: "GET",
            headers: {
                'crossdomain': 'true',
                "accept": "application/json ",
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Origin': '*'| 'http://localhost:3000',
                // "Access-Control-Allow-Methods": "GET",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}