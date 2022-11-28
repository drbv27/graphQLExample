
require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')

const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV == 'production'

// definicion de resolvers
const resolvers = require('./lib/resolvers')

// definicion de esquema

const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({ typeDefs, resolvers})

/* Middleware CORS */
app.use(cors())


/* Middleware desde uin endpoint */
app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log(' server is listening on port: ' + port)
})