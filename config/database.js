const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'foodbar' // Name of the specific database
};

const connectMongoose = () => {
    mongoose.connect(dbUrl,options)
        .then((obj) => {
            console.log(`connected to mongodb ${obj.connection.host}`);
        })
        .catch(err => console.log(err));
}

module.exports = connectMongoose