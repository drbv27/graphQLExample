const { MongoClient } = require('mongodb')

const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env

// const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const mongoUrl = 'mongodb://localhost:27017' // porque no tengo usuario y contraseña 

let connection

async function connectDB() {
    if (connection) return connection

    try {
        let client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        connection = client.db(DB_NAME)
    } catch (error) {
        console.error('No se pudo conectar a la BD', mongoUrl, error)
        process.exit(1)
    }
    return connection
}

module.exports = connectDB