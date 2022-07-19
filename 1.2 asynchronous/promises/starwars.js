const axios = require('axios');

const swapi = async (num)=>{
    let url = 'https://swapi.co/api/people/' + num;
    const resp = await axios(url,{
        method: 'GET',
    })
    console.log(resp);
}

swapi(1)