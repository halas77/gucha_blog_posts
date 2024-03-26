const { mongoose } = require('mongoose')

// database connection

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log('DB connected Successfully!');

    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB


