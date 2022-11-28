const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    users: async() => {
        let db, users = []
        try {
            db = await connectDB()
            users = await db.collection('users').find().toArray()
        } catch (error) {
            console.log(error)
        }
        return users
    },
    user: async(root, args) => {
        let db, user = []
        try {
            db = await connectDB()
            user = await db.collection('users').findOne({ _id: ObjectID(args.id) })
        } catch (error) {
            console.log(error)
        }
        return user
    },

    /* Queries para los productos */

        products: async() => {
        let db, products = []
        try {
            db = await connectDB()
            products = await db.collection('products').find().toArray()
        } catch (error) {
            console.log(error)
        }
        return products
    },
    product: async(root, args) => {
        let db, product = []
        try {
            db = await connectDB()
            product = await db.collection('products').findOne({ _id: ObjectID(args.id) })
        } catch (error) {
            console.log(error)
        }
        return product
    }

}