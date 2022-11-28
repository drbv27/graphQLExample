const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    createUser: async(root, args) => {
        let db, user = args.input
        try {
            db = await connectDB()
            result = await db.collection('users').insertOne(args.input)
            user._id = result.insertedId
        } catch (error) {
            console.log(error)
        }
        return user
    },
    /*  Creacion de producto */
    createProduct: async(root, args) => {
        let db, product = args.input
        try {
            db = await connectDB()
            result = await db.collection('products').insertOne(args.input)
            product._id = result.insertedId
        } catch (error) {
            console.log(error)
        }
        return product
    },

    /* Edicion del producto */

    editProduct: async(root, args) => {
        let db, product
        try {
            db = await connectDB()
            await db.collection('products').updateOne({ _id: ObjectID(args._id) }, { $set: args.input })
            product = await db.collection('products').findOne({ _id: ObjectID(args._id) })
        } catch (error) {
            console.log(error)
        }
        return product
    }

}