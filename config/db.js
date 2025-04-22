const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        console.info('Connected to DB');
    } catch (e) {
        console.error(e);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

module.exports = connectDB;