const express = require('express')
const elasticsearch = require('elasticsearch')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const config = require('./config/config')
const schema = require('./schema/schema');

const app = express()
mongoose.connect(config.mongoUri, {
  reconnectTries: 3
}).
  then(
    () => console.log('Connected to mongo'),
    error => console.error(JSON.stringify({URI: config.mongoUri, error}, null, 2))
  )


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => console.log('Listening for requests at port 4000'))

// var client = new elasticsearch.Client({
//   host: [{
//     protocol: 'https',
//     host: 'aus-lnasesq-001.wiley.com',
//     port: 9200,
//     auth: 'elastic:elastic-for-jupiter'
//   }],
//   apiVersion: '6.2',
//   log: 'trace'
// })

// client.index({
//   index: 'test-esjs',
//   type: '_doc',  
//   body: {
//     name: 'Debojit Sengupta',
//     tags: ['developer'],
//     age: 29,    
//   }
// }).then(body => console.log(body), error => console.error(error))

