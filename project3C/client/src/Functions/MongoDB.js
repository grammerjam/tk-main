import { MongoClient, ServerApiVersion } from 'mongodb';
import apikey from '../secrets';

const uri = "mongodb+srv://jayembailey:<password>@sm-project3.qyqaunc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

var axios = require('axios');
var data = JSON.stringify({
    "collection": "theaters",
    "database": "sample_mflix",
    "dataSource": "SM-Project3",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'GET',
    url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-vxubr/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': `${apikey}`,
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
