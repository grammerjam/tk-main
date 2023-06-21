import apikey from '../secrets'

async function getData() {
    var data = JSON.stringify({
        "collection": "theaters",
        "database": "sample_mflix",
        "dataSource": "SM-Project3",
        "projection": {
            "_id": 1
        }
    });
    try {
        await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-vxubr/endpoint/data/v1/action/findOne', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${apikey}`,
            },
            data: data,
        });
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

export default getData