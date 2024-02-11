import mongoose from 'mongoose'

const { MONGO_DB_URI } = process.env

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.error('error while connecting to MongoDB', error.message)
})